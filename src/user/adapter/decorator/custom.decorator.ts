import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { User } from 'user/domain';

export const GetAccount = createParamDecorator((data, context): User => {
  const req = context.args[0];
  if (req?.user) return req.user;
  throw new UnauthorizedException();
});
