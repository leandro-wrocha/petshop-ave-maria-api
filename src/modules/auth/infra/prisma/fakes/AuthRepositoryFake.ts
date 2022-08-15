import { IAuthRepository } from "@modules/auth/repositories/IAuthRepository";
import { UserRepositoryFake } from "@modules/users/infra/prisma/fakes/UserRepositoryFake";
import { RefreshToken, User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { GenerateTokenProviderFake } from "@shared/infra/http/providers/fakes/GenerateTokenProviderFake";
import { GenerateRefreshTokenProviderFake } from "@shared/infra/http/providers/fakes/GenereateRefreshTokenProviderFake";

const generateTokenProviderFake = new GenerateTokenProviderFake();

export class AuthRepositoryFake implements IAuthRepository {
  private refreshTokenArray: RefreshToken[];

  constructor(private users: User[]) {
    this.refreshTokenArray = [];
  }

  async signIn(
    username: string
  ): Promise<{ token: string; refreshToken: RefreshToken }> {
    const genereateRefreshTokenProviderFake =
      new GenerateRefreshTokenProviderFake(this.refreshTokenArray);

    const userAlreadyExists = this.users.find(
      (user) => user.username === username
    );

    if (!userAlreadyExists) {
      throw new AppError("Unauthorized", "User no exists", 401);
    }

    const token = generateTokenProviderFake.execute(userAlreadyExists.id);

    const refreshTokensIndex = this.refreshTokenArray.findIndex(
      (refresh) => refresh.userId === userAlreadyExists.id
    );

    this.refreshTokenArray.splice(refreshTokensIndex);

    const refreshToken = await genereateRefreshTokenProviderFake.execute(
      userAlreadyExists.id
    );

    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(id: string): Promise<string> {
    const refreshTokenExists = this.refreshTokenArray.find(
      (refresh) => refresh.id === id
    );

    if (!refreshTokenExists) {
      throw new AppError("Unauthorized", "Token is invalid", 401);
    }

    const token = generateTokenProviderFake.execute(refreshTokenExists.userId);

    return token;
  }
}
