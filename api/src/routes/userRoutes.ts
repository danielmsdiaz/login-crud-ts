import { Router, Request, Response } from "express";
import * as userFunctions from "../controllers/userController";

const routes = Router();
routes.post("/register", userFunctions.register);

// routes.post("/register", userFunctions.registerUser);
// routes.post("/auth", userFunctions.logUser);

export default routes;