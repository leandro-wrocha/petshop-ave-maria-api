import request from "supertest";
import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma";

describe("CreateUserController POST /users", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username: "leandro-wrocha",
      },
    });
  });

  it("should create an user", async () => {
    const response = await request(app).post("/users").send({
      name: "Leandro Ferreira",
      username: "leandro-wrocha",
    });

    expect(response.statusCode).toBe(201);
  });

  it("should not create a user duplicate", async () => {
    const response = await request(app).post("/users").send({
      name: "Leandro Ferreira",
      username: "leandro-wrocha",
    });

    expect(response.statusCode).toBe(401);
  });
});
