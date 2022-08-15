import "reflect-metadata";
import "dotenv/config";

import { verify } from "jsonwebtoken";

import { ILoginRequest } from "@modules/auth/dtos";
import { AuthRepositoryFake } from "@modules/auth/infra/prisma/fakes/AuthRepositoryFake";
import { UserRequest } from "@modules/users/dtos";
import { UserRepositoryFake } from "@modules/users/infra/prisma/fakes/UserRepositoryFake";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUser/CreateUserUseCase";
import { LoginUserUseCase } from "../LoginUser/LoginUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

const userRepositoryFake = new UserRepositoryFake();
const createUserUseCase = new CreateUserUseCase(userRepositoryFake);

describe("RefreshTokenUseCase", () => {
  beforeAll(async () => {
    const data: UserRequest = {
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    };

    await createUserUseCase.execute(data);
  });

  it("should be return an token, by refreshToken", async () => {
    const users = await userRepositoryFake.list();
    const authRepository = new AuthRepositoryFake(users);
    const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
    const loginUserUseCase = new LoginUserUseCase(authRepository);

    const data: ILoginRequest = {
      username: "leandro-wrocha",
    };

    const { token, refreshToken } = await loginUserUseCase.execute(
      data.username
    );

    const response = await refreshTokenUseCase.execute(refreshToken.id);

    expect(
      verify(response, process.env.SECRET_KEY || "secretDevelop")
    ).toBeTruthy();
  });

  it("should be return token is invalid", async () => {
    const users = await userRepositoryFake.list();
    const authRepository = new AuthRepositoryFake(users);
    const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
    const loginUserUseCase = new LoginUserUseCase(authRepository);

    const data: ILoginRequest = {
      username: "leandro-wrocha",
    };

    const { token, refreshToken } = await loginUserUseCase.execute(
      data.username
    );

    try {
      await refreshTokenUseCase.execute(refreshToken.id);
    } catch (err: any) {
      expect(err.name).toBe("Unauthorized");
      expect(err.message).toBe("Token is invalid");
      expect(err.statusCode).toEqual(401);
    }
  });
});
