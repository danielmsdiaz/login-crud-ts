import { WorkoutCreateInput } from './../models/Workout';
import { Request, Response } from "express";
import { Prisma as PrismaClient } from "@prisma/client";
import { personalFunctions } from "../services/personal";
import { userFunctions } from "../services/user";
import { contractFunctions } from "../services/contract";
import { any, z } from "zod";

export const createWorkout = async (req: Request, res: Response) => {
    const exercises = req.body.exercises;

    // Converter reps para número usando map
    const convertedExercises = exercises.map((exercise: { name: string, reps: string }) => ({
        ...exercise,
        reps: parseInt(exercise.reps, 10)  // Converte reps para número
    }));

    let data = { title: req.body.title, description: req.body.description, exercises: convertedExercises, personalId: req.body.personalId, alunoId: Number(req.body.selectedAluno) };

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
        else {
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
            include: {
                aluno: {
                    select: {
                        name: true,
                        lastName: true,
                    }
                }
            },
        })

        if (workouts) {
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

export const getAllAlunos = async (req: Request, res: Response) => {
    try {
        const idPersonal: number = parseInt(req.params.personalId);

        const contratos = await contractFunctions.contrato.findMany({
            where: {
                personalId: idPersonal,
                status: true
            }
        })

        if (!contratos) {
            throw new Error("O personal não possui nenhum aluno!")
        }

        const alunoIds = contratos.map((contrato) => contrato.alunoId);

        const alunos = await userFunctions.user.findMany({
            where: {
                id: {
                    in: alunoIds
                }
            }
        });

        res.send(alunos);
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

export const deleteWorkout = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const result = await personalFunctions.treino.delete({
            where: {
                id: id
            },
        })

        if (result) {
            res.send(result);
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

export const editWorkout = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const { title, description, exercises, aluno } = req.body;
        console.log(aluno);
        

        const result = await personalFunctions.treino.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
                exercises: exercises,
                alunoId: aluno
            },
        });

        if (result) {
            res.send(result);
        }
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            res.send(err.issues[0].message);
        } else {
            res.send(err.message);
        }
    }
};