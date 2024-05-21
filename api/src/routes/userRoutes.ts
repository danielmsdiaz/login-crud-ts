import { Router} from "express";
import * as userController from "../controllers/userController";
import {auth} from "../middlewares/auth"

const routes = Router();

routes.post("/register", userController.register);
routes.delete("/delete/:id", auth.private, userController.deleteAccount);

export default routes;