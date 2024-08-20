import { getLoggedUser } from './../controllers/userController';
import { Router} from "express";
import * as userController from "../controllers/userController";
import {auth} from "../middlewares/auth"

const routes = Router();

routes.post("/register", userController.register);
routes.delete("/delete/:id", auth.private, userController.deleteAccount);
routes.get("/personals/:type", userController.getUserTypePersonal);
routes.get("/users/:id", userController.getLoggedUser);

export default routes;