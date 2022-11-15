import { ISignInDTO, IUserDTO } from '../dto/sign-in.dto';

export interface IAuthService {
  signIn: (data: ISignInDTO) => Promise<IUserDTO>;
}
