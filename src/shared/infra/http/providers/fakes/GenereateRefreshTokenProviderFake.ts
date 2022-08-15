import { RefreshToken } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class GenerateRefreshTokenProviderFake {
  constructor(private refreshToken: RefreshToken[]) {
    /* */
  }

  public async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(60, "day").unix();

    const data = {
      id: randomUUID(),
      userId,
      expiresIn,
    };

    await this.refreshToken.push(data);

    const generateRefreshToken = data;

    return generateRefreshToken;
  }
}
