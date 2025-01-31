import { Router} from "express";
import * as contractController from "../controllers/contractController";

const routes = Router();
routes.post("/create", contractController.createContract);
routes.delete("/delete", contractController.deleteContract);
routes.get("/get/:type/:id", contractController.getUserContracts);

export default routes;