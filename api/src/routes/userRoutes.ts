import { Router} from "express";
import * as userController from "../controllers/userController";

const routes = Router();
routes.post("/register", userController.register);
// routes.post("/auth", userFunctions.logUser);

export default routes;