import { Request, Response } from "express";
import { Prisma as PrismaClient } from "@prisma/client";
import { contractFunctions } from "../services/contract";
import { any, z } from "zod";

export const createContract = async (req: Request, res: Response) => {
    let data: PrismaClient.ContratoUncheckedCreateInput = {alunoId: req.body.loggedUserId, personalId: req.body.personalId};

    try {
        const workout = await contractFunctions.contrato.create({
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
