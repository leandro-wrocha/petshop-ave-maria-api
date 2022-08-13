import request from "supertest";
import { app } from "../../../../shared/infra/http/app";

describe("CreateUserController POST /users", () => {
  it("should create an user", async () => {
    const response = await request(app).post("/users").send({
      name: "Leandro Ferreira",
      username: "leandro-wroc",
    });

    expect(response.statusCode).toBe(201);
  });
});
