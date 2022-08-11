import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }
}
