import { User } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma";
import { UserDTO } from "../../dtos";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async list(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async create(data: UserDTO): Promise<void> {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username: data.username
      }
    })

    if(userAlreadyExists) {
      throw new AppError('Unathorization', 'User already exists', 401);
    }

    await prisma.user.create({ data });
  }

  async findByUsername(username: string): Promise<User> {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if(!userAlreadyExists) {
      throw new AppError('Error', 'User no exists', 404);
    }

    return userAlreadyExists;
  }
}
