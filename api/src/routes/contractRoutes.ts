import { Router} from "express";
import * as contractController from "../controllers/contractController";

const routes = Router();
routes.post("/create", contractController.createContract);
routes.delete("/delete", contractController.deleteContract);
routes.put("/put", contractController.editContract);
routes.get("/get/:type/:id", contractController.getUserContracts);
routes.get("/get/:type/:id/:status", contractController.getActiveContracts);

export default routes;