import request from "supertest";
import { app } from "@shared/infra/http/app";

describe("List users GET /users", () => {
  it("should list an array of users", async () => {
    const test = await request(app).post("/users").send({
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    });

    const { body } = await request(app).post("/login").send({
      username: "leandro-wrocha",
    });

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${body.token}`);

    expect(response.statusCode).toBe(200);
  });
});
