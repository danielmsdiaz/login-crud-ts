import { Router} from "express";
import * as personalController from "../controllers/personalController";
import {auth} from "../middlewares/auth"

const routes = Router();
routes.post("/workout", personalController.createWorkout);
routes.get("/workout/:personalId", personalController.getAllWorkouts);
routes.delete("/workout/:id", personalController.deleteWorkout);
routes.put("/workout/:id", personalController.editWorkout);
routes.get("/alunos/:personalId", personalController.getAllAlunos);

export default routes;