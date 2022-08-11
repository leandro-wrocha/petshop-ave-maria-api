import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from "express";

import { AppError } from '../../errors/AppError';
import { routes } from "./routes";

import "../../container";

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: AppError, request: Request, response: Response, next: NextFunction) => {
  return response.status(error.statusCode).json({
    status: error.name,
    message: error.message
  })
})

export { app };
