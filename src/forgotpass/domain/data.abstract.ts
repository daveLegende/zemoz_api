import { IGenericRepository } from "../../igeneric.interface";
import { ForgotPass } from "./fgp.model";

export abstract class IForgotPassRepository {
    abstract fgps: IGenericRepository<ForgotPass>;
}