import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma";
import { verify } from "jsonwebtoken";

describe("RefreshTokenController POST /refresh-token", () => {
  beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should be return an token with refreshToken", async () => {
    await request(app).post("/users").send({
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    });

    const { body } = await request(app).post("/login").send({
      username: "leandro-wrocha",
    });

    const response = await request(app).post("/refresh-token").send({
      id: body.refreshToken.id,
    });

    expect(
      verify(response.body, process.env.SECRET_KEY || "secretDevelop")
    ).toBeTruthy();
  });

  it("should be return token is invalid", async () => {
    await request(app).post("/users").send({
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    });

    const { body } = await request(app).post("/login").send({
      username: "leandro-wrocha",
    });

    try {
      await request(app)
        .post("/refresh-token")
        .send({
          id: `${body.refreshToken.id}+invalid`,
        });
    } catch (err: any) {
      expect(err.statuCode).toEqual(401);
    }
  });
});
