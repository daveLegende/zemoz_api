export declare abstract class HashFactory {
    static hashPwd(password: string): Promise<string>;
    static isRightPwd(password: string, pass: string): Promise<boolean>;
}
