import { request, response, NextFunction } from "express";
import { randomUUID } from "crypto";

import { GenerateTokenProviderFake } from "../providers/fakes/GenerateTokenProviderFake";

import { EnsuredAuthenticatedMiddleware } from "./EnsuredAuthenticatedMiddleware";

describe("EnsuredAuthenticatedMiddleware", () => {
  it("should be check if token is valid", async () => {
    const ensuredAuthenticatedMiddlware = new EnsuredAuthenticatedMiddleware();
    const generateTokenProviderFake = new GenerateTokenProviderFake();
    const token = generateTokenProviderFake.execute(randomUUID());
    const next: NextFunction = () => {};

    request.headers.authorization = `Bearer ${token}`;

    expect(
      ensuredAuthenticatedMiddlware.execute(request, response, next)
    ).toBeUndefined();
  });

  it("should be check if token is invalid", async () => {
    const ensuredAuthenticatedMiddlware = new EnsuredAuthenticatedMiddleware();
    const generateTokenProviderFake = new GenerateTokenProviderFake();
    const token = generateTokenProviderFake.execute(randomUUID());
    const next: NextFunction = () => {};

    request.headers.authorization = `Bearer ${token}invalid`;

    try {
      ensuredAuthenticatedMiddlware.execute(request, response, next);
    } catch (err: any) {
      expect(err.message).toBe("Token is invalid");
    }
  });

  it("should be check if token is missing", async () => {
    const ensuredAuthenticatedMiddlware = new EnsuredAuthenticatedMiddleware();
    const next: NextFunction = () => {};

    request.headers.authorization = undefined;

    try {
      ensuredAuthenticatedMiddlware.execute(request, response, next);
    } catch (err: any) {
      expect(err.message).toBe("Token is missing");
    }
  });
});
