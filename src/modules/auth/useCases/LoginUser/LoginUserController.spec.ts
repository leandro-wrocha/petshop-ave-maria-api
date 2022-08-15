import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma";

describe("LoginUserController POST /login", () => {
  beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should be login an user exists", async () => {
    await request(app).post("/users").send({
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    });

    const response = await request(app).post("/login").send({
      username: "leandro-wrocha",
    });

    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
  });
});
