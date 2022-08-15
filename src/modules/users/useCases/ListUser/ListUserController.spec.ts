import request from "supertest";

import { prisma } from "@shared/infra/prisma";
import { app } from "@shared/infra/http/app";

describe("ListUserController GET /users", () => {
  beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should be return an list of users", async () => {
    await request(app).post("/users").send({
      name: "Leandro",
      username: "leandro-wrocha",
    });

    const responseLogin = await request(app).post("/login").send({
      username: "leandro-wrocha",
    });

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${responseLogin.body.token}`);

    const users = await prisma.user.findMany();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toStrictEqual(users);
  });

  it("should not be return an list of users no with authorization", async () => {
    await request(app).post("/users").send({
      name: "Leandro",
      username: "leandro-wrocha",
    });

    const responseLogin = await request(app).post("/login").send({
      username: "leandro-wrocha",
    });

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${responseLogin.body.token}invalid`);

    const users = await prisma.user.findMany();

    expect(response.statusCode).toEqual(401);
  });
});
