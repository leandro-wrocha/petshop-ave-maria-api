import { inject, injectable } from "tsyringe";
import { UserDTO } from "../../dtos";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {
    /**/
  }

  async execute(data: UserDTO): Promise<void> {
    await this.userRepository.create(data);
  }
}
