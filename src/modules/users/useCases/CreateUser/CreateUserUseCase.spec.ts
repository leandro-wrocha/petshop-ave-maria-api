import "reflect-metadata";

import { UserRequest } from "@modules/users/dtos";
import { UserRepositoryFake } from "@modules/users/infra/prisma/fakes/UserRepositoryFake";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepositoryFake = new UserRepositoryFake();
const createUserUseCase = new CreateUserUseCase(userRepositoryFake);

describe("CreateUserUseCase", () => {
  it("should be create an user", async () => {
    const data: UserRequest = {
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    };

    await createUserUseCase.execute(data);

    const user = await userRepositoryFake.findByUsername(data.username);

    expect(user).toHaveProperty("id");
    expect(user.username).toBe(data.username);
  });

  it("should not be create an user duplicate", async () => {
    const data: UserRequest = {
      name: "Leandro Rocha",
      username: "leandro-wrocha",
    };

    try {
      await createUserUseCase.execute(data);
    } catch (err: any) {
      expect(err.name).toBe("Bad Request");
      expect(err.message).toBe("User already Exists");
      expect(err.statusCode).toBe(400);
    }
  });
});
