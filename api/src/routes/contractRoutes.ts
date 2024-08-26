import { Router} from "express";
import * as contractController from "../controllers/contractController";

const routes = Router();
routes.post("/create", contractController.createContract);

export default routes;