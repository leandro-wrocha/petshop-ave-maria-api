import { RefreshToken } from "@prisma/client";
import dayjs from "dayjs";

import { prisma } from "@shared/infra/prisma";

export class GenerateRefreshTokenProvider {
  public async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(60, "day").unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}
