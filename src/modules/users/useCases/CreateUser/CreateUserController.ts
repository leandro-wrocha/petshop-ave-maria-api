import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserRequest } from "../../dtos";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: UserRequest = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(data);

    return response.status(201).end();
  }
}