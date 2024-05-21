import { Router} from "express";
import * as authController from "../controllers/authController";

const routes = Router();

routes.get("/login", authController.login);

export default routes;