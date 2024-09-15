import * as bcrypt from 'bcryptjs';

export abstract class HashFactory {
  static async hashPwd(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  static async isRightPwd(password: string, pass: string): Promise<boolean> {
    return await bcrypt.compare(password, pass);
  }

  // static async compare (password: string, pass: string) {
  //     const hashed = await this.hashPwd(password);
  //     return hashed === pass;
  // }
}
