import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IDParamDTO } from 'adapter/dto';
import { AccessEnum } from 'user/domain';
import { IUserController, IUserService } from 'user/app/module/user';
import { User } from 'user/domain/user.model';
import { HasPermission } from 'adapter/decorator';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { BaseConfig } from 'config/base.config';
import { GetAccount } from 'user/adapter/decorator';
import {
  DocUserOutputDTO,
  DocSignedUserDTO,
  RegisterAccoutDTO,
  UpdateUserDTO,
  UserQueryDTO,
  ReinitialisePassAccountDTO,
  ChangePassAccountDTO,
} from 'user/adapter/dto';
import { UserFactory } from 'user/adapter/user.factory';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
import { ForgotPassAccountDto } from 'src/forgotpass/adapter/dto';
import { UserService } from './user.service';
import { ForgotPass } from 'src/forgotpass/domain';
import { IReinitialisePassDTO, IChangePasswordDTO } from 'user/app/dto';

@ApiTags('Users management')
@ApiBearerAuth()
@UseGuards(UserGuard, AdminGuard)
@Controller('users')
export class UserController implements IUserController {
  constructor(
    private readonly userService: IUserService,
  ) {}

  @Get()
  @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Users list',
    description: 'Fetch all users in the DB',
  })
  @ApiResponse({ type: [DocUserOutputDTO] })
  async all(): Promise<User[]> {
    const users = await this.userService.fetchAll();
    return users?.map((user) => UserFactory.getUser(user));
  }

  @Get('token.signin')
  @ApiOperation({ summary: 'Token connexion' })
  @ApiResponse({ type: DocSignedUserDTO })
  async signinByToken(@GetAccount() user: User): Promise<User> {
    return UserFactory.getUser(user);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Single account',
    description: 'Fetch the staff account by some of its informations',
  })
  @ApiQuery({
    type: String,
    name: 'email',
    description: 'email of the auth staff',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'phone',
    description: 'phone number of the auth staff',
    required: false,
  })
  @ApiResponse({ type: DocUserOutputDTO })
  async search(@Query() param: UserQueryDTO): Promise<User> {
    if (param) {
      return UserFactory.getUser(await this.userService.search(param));
    }
  }

  @Get(':id')
  @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One User',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocUserOutputDTO })
  async show(@Param() { id }: IDParamDTO): Promise<User> {
    return UserFactory.getUser(await this.userService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */

  @Post()
  // @HasPermission(AccessEnum.CAN_CREATE_USER)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: BaseConfig.setFilePath,
        filename: BaseConfig.editFileName,
      }),
      fileFilter: BaseConfig.imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create account user',
  })
  @ApiBody({ type: RegisterAccoutDTO })
  @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: RegisterAccoutDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    data.avatar = file?.filename;
    const user = await this.userService.add(data);
    if (user) return UserFactory.getUser(user);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @HasPermission(AccessEnum.CAN_UPDATE_USER)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: BaseConfig.setFilePath,
        filename: BaseConfig.editFileName,
      }),
      fileFilter: BaseConfig.fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ type: DocUserOutputDTO })
  async update(
    @Body() data: UpdateUserDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    data.avatar = file?.filename;
    return UserFactory.getUser(await this.userService.edit(data));
  }

  @Patch('state/:id')
  @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.userService.setState(id);
  }

  /**
   * @method DELETE
   */
  @Delete(':id')
  @HasPermission(AccessEnum.CAN_DELETE_USER)
  @ApiOperation({ summary: 'Remove Account' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the user to delete',
  })
  @ApiResponse({ type: Boolean })
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.userService.remove(id);
  }


  /**
   *
   * @method POST
   */

  @Post("reinitialise-pass")
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Réinitialise mot de passe',
  })
  async reinitialisePass(
    @Body() data: ReinitialisePassAccountDTO,
  ): Promise<User> {
    const user = await this.userService.reinitialisePass(data);
    return user;
  }

  
  /**
   *
   * @method POST
   */

  @Post("change-pass")
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Changement de mot de passe',
  })
  async changePass(
    @Body() data: ChangePassAccountDTO,
  ): Promise<User> {
    const user = await this.userService.changePass(data);
    return user;
  }
}
