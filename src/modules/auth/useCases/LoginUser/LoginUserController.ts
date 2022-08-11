import { Request, Response } from "express";
import { container } from "tsyringe";

import { ILoginRequest } from '../../dtos';

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username }: ILoginRequest = request.body;
    const loginUserUseCase = container.resolve(LoginUserUseCase);
    
    const { token, refreshToken } = await loginUserUseCase.execute(username);

    return response.status(200).json({ token, refreshToken });
  }
}
