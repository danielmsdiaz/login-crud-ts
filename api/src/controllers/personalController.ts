import { Request, Response } from "express";
import { Prisma as PrismaClient } from "@prisma/client";
import { personalFunctions } from "../services/personal";
import { any, z } from "zod";

export const createWorkout = async (req: Request, res: Response) => {
    const exercises = req.body.exercises;

    // Converter reps para número usando map
    const convertedExercises = exercises.map((exercise: { name: string, reps: string }) => ({
        ...exercise,
        reps: parseInt(exercise.reps, 10)  // Converte reps para número
    }));

    let data: PrismaClient.TreinoUncheckedCreateInput = { title: req.body.title, description: req.body.description, exercises: convertedExercises, personalId: req.body.personalId};
  
    try {
        const workout = await personalFunctions.treino.create({
            data
        })

        res.status(201).json({ "Workout": workout });
    }
    catch (err: any) {
        if (err instanceof z.ZodError) {
            res.send(err);
        }
        else{
            res.status(400).send(err)
        }
    }
}

export const getAllWorkouts = async (req: Request, res: Response) => {
    try {
        const idPersonal: number = parseInt(req.params.personalId);
        
        const workouts = await personalFunctions.treino.findMany({
            where: {
                personalId: idPersonal
            },
        })
        
        if(workouts){
            res.send(workouts);
        }
    }
    catch (err: any) {
        if (err instanceof z.ZodError) {
            res.send(err.issues[0].message);
        }
        else {
            res.send(err.message)
        }
    }
}