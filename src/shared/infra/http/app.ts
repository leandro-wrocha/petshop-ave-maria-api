import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import express, { Request, Response } from "express";
import cors from "cors";

import { AppError } from "@shared/errors/AppError";
import { routes } from "./routes";

import "@shared/container";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((error: AppError, request: Request, response: Response) =>
  response.status(error.statusCode).json({
    status: error.name,
    message: error.message,
  })
);

export { app };
