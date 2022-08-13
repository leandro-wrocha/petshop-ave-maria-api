import { inject, injectable } from "tsyringe";

import { IAuthRepository } from "../../repositories/IAuthRepository";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {
    /**/
  }

  async execute(id: string): Promise<string> {
    const data = await this.authRepository.refreshToken(id);

    return data;
  }
}
