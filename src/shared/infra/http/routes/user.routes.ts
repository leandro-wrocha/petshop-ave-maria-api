import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController";
import { ListUserController } from "@modules/users/useCases/ListUser/ListUserController";
import { EnsuredAuthenticated } from "../middlewares/EnsuredAuthenticatedMiddleware";

const userRoutes = Router();

const listUserController = new ListUserController();
const createUserController = new CreateUserController();
const ensuredAuthenticated = new EnsuredAuthenticated();

userRoutes.get("/", ensuredAuthenticated.execute, listUserController.handle);
userRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
    }),
  }),
  createUserController.handle
);

export { userRoutes };
