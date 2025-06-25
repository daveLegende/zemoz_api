import { Team } from "src/team/domain";
import { ForgotPass } from "../domain";
import { ICreateForgotPassDTO, IUpdateForgotPassDTO } from "../app/dto";
import { User } from "user/domain";
import { HashFactory } from "user/adapter/guard/hash.factory";

export abstract class ForgotPassFactory {
    static async create(data: ICreateForgotPassDTO): Promise<ForgotPass> {
        const fgp = new ForgotPass();

        fgp.code = await HashFactory.hashPwd(data.code);
        fgp.email = data.email;

        return fgp;
    }
    
    static getFgp(fgp: ForgotPass): ForgotPass {
      if (fgp) {
        return {
          id: fgp.id,
          code: fgp.code,
          email: fgp.email,
          createdAt: fgp.createdAt,
          updatedAt: fgp.updatedAt,
          deletedAt: fgp.deletedAt
        };
      }
    }
}