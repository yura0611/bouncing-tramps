import {IUser} from '../../user/models/user.interface';

export interface ILoginResponse {
  token: string;
  user: IUser;
}
