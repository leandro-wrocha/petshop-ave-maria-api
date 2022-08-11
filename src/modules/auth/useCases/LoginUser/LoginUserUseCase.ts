import { RefreshToken } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IAuthRepository } from "../../repositories/IAuthRepository";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async execute(username: string): Promise<{ 
    token: string,
    refreshToken: RefreshToken 
  }> {
    return await this.authRepository.signIn(username);
  }
}
