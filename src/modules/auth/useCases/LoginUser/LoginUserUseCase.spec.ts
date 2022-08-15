import "reflect-metadata";
import "dotenv/config";
import { verify } from "jsonwebtoken";
import { User } from "@prisma/client";

import { ILoginRequest } from "@modules/auth/dtos";
import { AuthRepositoryFake } from "@modules/auth/infra/prisma/fakes/AuthRepositoryFake";
import { UserRequest } from "@modules/users/dtos";
import { UserRepositoryFake } from "@modules/users/infra/prisma/fakes/UserRepositoryFake";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUser/CreateUserUseCase";

import { IAuthRepository } from "@modules/auth/repositories/IAuthRepository";

import { LoginUserUseCase } from "./LoginUserUseCase";

const userRepositoryFake = new UserRepositoryFake();
const createUserUseCase = new CreateUserUseCase(userRepositoryFake);

describe("LoginUserUseCase", () => {
  let users: User[];
  let authRepositoryFake: IAuthRepository;
  let loginUserUseCase: LoginUserUseCase;

  beforeAll(async () => {
    const data: UserRequest = {
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    };

    await createUserUseCase.execute(data);
  });

  beforeEach(async () => {
    users = await userRepositoryFake.list();
    authRepositoryFake = new AuthRepositoryFake(users);
    loginUserUseCase = new LoginUserUseCase(authRepositoryFake);
  });

  it("should be login an user with credentials correct", async () => {
    const data: ILoginRequest = {
      username: "leandro-wrocha",
    };

    const response = await loginUserUseCase.execute(data.username);

    expect(
      verify(response.token, process.env.SECRET_KEY || "secretDevelop")
    ).toBeTruthy();

    expect(response).toHaveProperty("token");
    expect(response.refreshToken).toHaveProperty("id");
    expect(response.refreshToken).toHaveProperty("userId");
    expect(response.refreshToken).toHaveProperty("expiresIn");
  });

  it("should not be login an user with credentials incorrect", async () => {
    const data: ILoginRequest = {
      username: "leandro",
    };

    try {
      await loginUserUseCase.execute(data.username);
    } catch (err: any) {
      expect(err.name).toBe("Unauthorized");
      expect(err.message).toBe("User no exists");
      expect(err.statusCode).toEqual(401);
    }
  });
});
