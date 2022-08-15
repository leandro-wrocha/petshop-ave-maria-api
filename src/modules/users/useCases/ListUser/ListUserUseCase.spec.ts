import "reflect-metadata";
import "dotenv/config";

import { AuthRepositoryFake } from "@modules/auth/infra/prisma/fakes/AuthRepositoryFake";
import { IAuthRepository } from "@modules/auth/repositories/IAuthRepository";
import { LoginUserUseCase } from "@modules/auth/useCases/LoginUser/LoginUserUseCase";
import { UserRequest } from "@modules/users/dtos";
import { UserRepositoryFake } from "@modules/users/infra/prisma/fakes/UserRepositoryFake";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { User } from "@prisma/client";
import {
  EnsuredAuthenticatedMiddlewareFake,
  Request,
} from "@shared/infra/http/middlewares/fakes/EnsuredAuthenticatedMiddlewareFake";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { ListUserUseCase } from "./ListUserUseCase";

describe("ListUserUseCase", () => {
  let userRepositoryFake: IUserRepository;
  let authRepositoryFake: IAuthRepository;
  let users: User[];
  let token: string;

  let listUserUseCase: ListUserUseCase;
  let ensuredAuthenticatedMiddlewareFake: EnsuredAuthenticatedMiddlewareFake;

  beforeAll(async () => {
    userRepositoryFake = new UserRepositoryFake();
    users = await userRepositoryFake.list();
    authRepositoryFake = new AuthRepositoryFake(users);

    const createUserUseCase = new CreateUserUseCase(userRepositoryFake);
    const loginUserUseCase = new LoginUserUseCase(authRepositoryFake);

    const userOne: UserRequest = {
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    };

    await createUserUseCase.execute(userOne);

    const userTwo: UserRequest = {
      name: "Luan Rocha",
      username: "luan4g",
    };

    await createUserUseCase.execute(userTwo);

    const response = await loginUserUseCase.execute("leandro-wrocha");
    token = `Bearer ${response.token}`;
  });

  beforeEach(async () => {
    listUserUseCase = new ListUserUseCase(userRepositoryFake);
    ensuredAuthenticatedMiddlewareFake =
      new EnsuredAuthenticatedMiddlewareFake();
  });

  it("should be return a list users", async () => {
    const refreshToken: Request = {
      headers: {
        authorization: token,
      },
    };

    ensuredAuthenticatedMiddlewareFake.execute(refreshToken);
    const response = await listUserUseCase.execute();

    expect(response).toBe(users);
  });

  it("should be return an error Token is missing", async () => {
    const refreshToken: Request = {
      headers: {},
    };

    try {
      ensuredAuthenticatedMiddlewareFake.execute(refreshToken);
    } catch (err: any) {
      expect(err.name).toBe("Unauthorized");
      expect(err.message).toBe("Token is missing");
      expect(err.statusCode).toEqual(401);
    }
  });

  it("should be return an error Token is invalid", async () => {
    const refreshToken: Request = {
      headers: {
        authorization: `${token}invalid`,
      },
    };

    try {
      ensuredAuthenticatedMiddlewareFake.execute(refreshToken);
    } catch (err: any) {
      expect(err.name).toBe("Unauthorized");
      expect(err.message).toBe("Token is invalid");
      expect(err.statusCode).toEqual(401);
    }
  });
});
