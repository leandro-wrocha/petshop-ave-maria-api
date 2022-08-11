import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRefreshTokenRequest } from "../../dtos";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id }: IRefreshTokenRequest = request.body;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const token = await refreshTokenUseCase.execute(id);

    return response.status(200).json(token);
  }
}