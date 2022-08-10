import { User } from "@prisma/client";
import { prisma } from "../../../../shared/infra/prisma";
import { UserDTO } from "../../dtos";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async list(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async create(data: UserDTO): Promise<void> {
    await prisma.user.create({ data });
  }
}
