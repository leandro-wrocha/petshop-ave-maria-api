import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { LoginUserController } from "@modules/auth/useCases/LoginUser/LoginUserController";

const loginRoutes = Router();

const loginUserController = new LoginUserController();

loginRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
    }),
  }),
  loginUserController.handle
);

export { loginRoutes };
