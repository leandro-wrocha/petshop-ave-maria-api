import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class ListUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { /**/ }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.list();

    return users;
  }
}
