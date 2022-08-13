import { Router } from "express";
import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController"; 
import { ListUserController } from "@modules/users/useCases/ListUser/ListUserController";
import { EnsuredAuthenticated } from "../middlewares/EnsuredAuthenticatedMiddleware";


const userRoutes = Router();

const listUserController = new ListUserController();
const createUserController = new CreateUserController();

userRoutes.get("/", EnsuredAuthenticated.execute, listUserController.handle);
userRoutes.post("/", createUserController.handle);

export { userRoutes };
