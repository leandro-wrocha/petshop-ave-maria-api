import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/useCases/CreateUser/CreateUserController";
import { ListUserController } from "../../../../modules/users/useCases/ListUser/ListUserController";
import { LoginUserController } from "../../../../modules/users/useCases/SignInUser/LoginUserController";

const userRoutes = Router();

const listUserController = new ListUserController();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

userRoutes.get("/", listUserController.handle);
userRoutes.post("/", createUserController.handle);
userRoutes.post("/login", loginUserController.handle);

export { userRoutes };
