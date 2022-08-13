import { container } from "tsyringe";

import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IAuthRepository } from "@modules/auth/repositories/IAuthRepository";

import { UserRepository } from "@modules/users/infra/prisma/UserRepository";
import { AuthRepository } from "@modules/auth/infra/prisma/AuthRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IAuthRepository>("AuthRepository", AuthRepository);
