import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;
    const [, token] = authorization?.split(" ") || "";
    
    const user = verify(token, 'secret')

    const listUserUseCase = container.resolve(ListUserUseCase);

    const users = await listUserUseCase.execute();

    return response.status(200).json(users);
  }
}
