import { Request, Response } from "express";
import { Prisma as PrismaClient } from "@prisma/client";
import { contractFunctions } from "../services/contract";
import { any, z } from "zod";

export const createContract = async (req: Request, res: Response) => {
    let data: PrismaClient.ContratoUncheckedCreateInput = { alunoId: req.body.loggedUserId, personalId: req.body.personalId };

    try {
        const contract = await contractFunctions.contrato.create({
            data
        })

        res.status(201).json({ "Workout": contract });
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

export const deleteContract = async (req: Request, res: Response) => {
    let data: PrismaClient.ContratoUncheckedCreateInput = { alunoId: req.body.loggedUserId, personalId: req.body.personalId };


    try {
        if (data.personalId) {   
            const contract = await contractFunctions.contrato.deleteMany({
                where: {
                    alunoId: data.alunoId,
                    personalId: data.personalId
                },
            });

            return res.status(201).json({ "contract": contract });
        }

        const contract = await contractFunctions.contrato.deleteMany({
            where: {
                alunoId: data.alunoId
            },
        });

        res.status(201).json({ "contract": contract });
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
        const type: number = parseInt(req.params.type);

        if (type === 0) {
            const contracts = await contractFunctions.contrato.findMany({
                where: {
                    alunoId: id
                },
            })

            if (contracts) {
                return res.send(contracts);
            }
        }

        const contracts = await contractFunctions.contrato.findMany({
            where: {
                personalId: id
            },
        })

        if (contracts) {
            return res.send(contracts);
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
