import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import { errors } from "celebrate";
import cors from "cors";

import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { routes } from "./routes";

import "@shared/container";

import swaggerDoc from "../../../../swagger.json";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(
  (error: AppError, request: Request, response: Response, next: NextFunction) =>
    response.status(error.statusCode).json({
      status: error.name,
      message: error.message,
    })
);

export { app };
