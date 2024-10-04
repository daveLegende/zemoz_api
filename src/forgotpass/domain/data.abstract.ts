import { IGenericRepository } from "src/igeneric.interface";
import { ForgotPass } from "./fgp.model";

export abstract class IForgotPassRepository {
    abstract fgps: IGenericRepository<ForgotPass>;
}