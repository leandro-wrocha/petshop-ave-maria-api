import { User } from "@prisma/client";
import { randomUUID } from "crypto";

import { UserDTO } from "@modules/users/dtos";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

export class UserRepositoryFake implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async create({ name, username }: UserDTO): Promise<void> {
    const userAlreadyExists = this.users.find(
      (user) => user.username === username
    );

    if (userAlreadyExists) {
      throw new AppError("Bad Request", "User already Exists", 400);
    }

    const user: User = {
      id: randomUUID(),
      name,
      username,
    };

    this.users.push(user);
  }

  async findByUsername(username: string): Promise<User> {
    const userExists = this.users.find((user) => user.username === username);

    if (!userExists) {
      throw new Error("User no exists");
    }

    return userExists;
  }
}
