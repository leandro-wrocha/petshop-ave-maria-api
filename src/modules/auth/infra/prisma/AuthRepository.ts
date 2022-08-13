import { RefreshToken } from "@prisma/client";

import { AppError } from "@shared/errors/AppError";
import { GenerateRefreshTokenProvider } from "@shared/infra/http/providers/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "@shared/infra/http/providers/GenerateTokenProvider";
import { prisma } from "@shared/infra/prisma";
import { IAuthRepository } from "@modules/auth/repositories/IAuthRepository";

const generateTokenProvider = new GenerateTokenProvider();
const genereateRefreshTokenProvider = new GenerateRefreshTokenProvider();

export class AuthRepository implements IAuthRepository {
  async signIn(username: string): Promise<{
    token: string;
    refreshToken: RefreshToken;
  }> {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userAlreadyExists) {
      throw new AppError("Unauthorized", "User no exists", 401);
    }

    const token = generateTokenProvider.execute(userAlreadyExists.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    });

    const refreshToken = await genereateRefreshTokenProvider.execute(
      userAlreadyExists.id
    );

    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(id: string): Promise<string> {
    const refreshTokenExists = await prisma.refreshToken.findFirst({
      where: {
        id,
      },
    });

    if (!refreshTokenExists) {
      throw new AppError("Unauthorized", "Token is invalid", 401);
    }

    const token = generateTokenProvider.execute(refreshTokenExists.userId);

    return token;
  }
}
