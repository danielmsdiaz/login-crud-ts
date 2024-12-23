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


export const getUserContracts = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        
        const contracts = await contractFunctions.contrato.findMany({
            where: {
                alunoId: id
            },
        })
        
        if(contracts){
            res.send(contracts);
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
