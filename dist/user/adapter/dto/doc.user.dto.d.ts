import { User, SexEnum } from 'user/domain';
export declare class DocUserOutputDTO implements User {
    id: string;
    firstname: string;
    lastname: string;
    email?: string;
    phone: string;
    sex: SexEnum;
    country: string;
    avatar: string;
    solde: number;
    isActivated: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class DocSignedUserDTO extends DocUserOutputDTO {
    accessToken: string;
}
