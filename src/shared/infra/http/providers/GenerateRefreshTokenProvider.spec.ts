import { User } from "@prisma/client";
import { prisma } from "@shared/infra/prisma";

import { GenerateRefreshTokenProvider } from "./GenerateRefreshTokenProvider";

describe("GenerateRefreshTokenProvider", () => {
  let user: User;

  beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();

    user = await prisma.user.create({
      data: {
        name: "Leandro",
        username: "leandro-wrocha",
      },
    });
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should be create a refreshToken", async () => {
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

    const response = await generateRefreshTokenProvider.execute(user.id);

    expect(response.userId).toBe(user.id);
    expect(response).toHaveProperty("expiresIn");
  });
});
