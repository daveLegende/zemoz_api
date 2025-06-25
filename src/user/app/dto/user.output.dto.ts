import { User } from '../../domain/user.model';

export interface SignedUserDTO extends User {
  accessToken: string;
}
