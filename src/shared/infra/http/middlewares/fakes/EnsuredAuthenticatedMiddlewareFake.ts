import { JwtPayload, verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

export interface Request {
  headers: {
    authorization?: string | undefined;
  };
}

export class EnsuredAuthenticatedMiddlewareFake {
  public execute(request: Request): string | JwtPayload {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError("Unauthorized", "Token is missing", 401);
    }

    const [, token] = authorization.split(" ");

    try {
      return verify(token, process.env.SECRET_KEY || "secretDevelop");
    } catch (error) {
      throw new AppError("Unauthorized", "Token is invalid", 401);
    }
  }
}
