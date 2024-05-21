import { Router} from "express";
import * as userController from "../controllers/userController";

const routes = Router();

routes.post("/register", userController.register);
routes.delete("/delete/:id", userController.deleteAccount);

export default routes;