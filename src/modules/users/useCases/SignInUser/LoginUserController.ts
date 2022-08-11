import { Request, Response } from "express";
import { container } from "tsyringe";
import { sign } from "jsonwebtoken";

import { UserSingInRequest } from "../../dtos";

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username }: UserSingInRequest = request.body;
    const loginUserUseCase = container.resolve(LoginUserUseCase);

    const user = await loginUserUseCase.execute(username);

    const token = sign(user, "secret", {
      expiresIn: "2m",
    });

    return response.status(200).json(token);
  }
}
