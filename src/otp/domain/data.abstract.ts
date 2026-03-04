import { IGenericRepository } from "../../igeneric.interface";
import { Otp } from "./otp.model";

export abstract class IOtpRepository {
    abstract otps: IGenericRepository<Otp>;
}