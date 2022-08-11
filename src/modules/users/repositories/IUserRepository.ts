import { User } from "@prisma/client";
import { UserDTO } from "../dtos";

export interface IUserRepository {
  list(): Promise<User[]>;
  create(data: UserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
}
