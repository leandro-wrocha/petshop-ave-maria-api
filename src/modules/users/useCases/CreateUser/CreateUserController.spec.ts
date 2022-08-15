import request from "supertest";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma";

describe("CreateUserController POST /users", () => {
  beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should be create an user", async () => {
    const response = await request(app).post("/users").send({
      name: "Leandro",
      username: "leandro-wrocha",
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should not be create an user duplicate", async () => {
    await request(app).post("/users").send({
      name: "Leandro",
      username: "leandro-wrocha",
    });

    const response = await request(app).post("/users").send({
      name: "Leandro",
      username: "leandro-wrocha",
    });

    expect(response.statusCode).toEqual(401);
  });

  it("should not be create an user no name and username", async () => {
    const response = await request(app).post("/users").send({});

    expect(response.statusCode).toEqual(400);
  });
});
