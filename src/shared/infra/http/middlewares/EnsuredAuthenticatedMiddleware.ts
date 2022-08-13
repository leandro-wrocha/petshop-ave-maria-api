import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

export class EnsuredAuthenticated {
  public static execute(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError("Unauthorized", "Token is missing", 401);
    }

    const [, token] = authorization.split(" ");

    try {
      verify(token, process.env.SECRET_KEY || "secretDevelop");
    } catch (error) {
      throw new AppError("Unauthorized", "Token is invalid", 401);
    }

    next();
  }
}
