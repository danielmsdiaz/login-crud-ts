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
    let data: PrismaClient.ContratoUncheckedCreateInput = { alunoId: req.body.loggedUserId, personalId: req.body.personalId, id: req.body.id, status: req.body.status };

    try {
        if (data.personalId) {
            const contract = await contractFunctions.contrato.delete({
                where: {
                    id: data.id
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

export const editContract = async (req: Request, res: Response) => {
    const id: number = req.body.id;

    if (!id) {
        return res.status(400).json({ error: "ID do contrato é obrigatório" });
    }

    try {
        console.log("ID recebido:", id);

        const existingContract = await contractFunctions.contrato.findUnique({
            where: { id }
        });

        if (!existingContract) {
            return res.status(404).json({ error: "Contrato não encontrado" });
        }

        const contract = await contractFunctions.contrato.updateMany({
            where: { id },
            data: { status: true },
        });

        console.log("Contrato atualizado:", contract);

        return res.status(200).json({ contract });
    } catch (err: any) {
        console.error("Erro ao atualizar contrato:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
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
            include: {
                aluno: {
                    select: {
                        name: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
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

export const getActiveContracts = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const status: boolean = req.params.status === "1" ? true : false
        const type: number = parseInt(req.params.type);

        if (type === 0) {
            const contracts = await contractFunctions.contrato.findFirst({
                where: {
                    alunoId: id,
                    status: status,
                },
                include: {
                    personal: {
                        select: {
                            name: true,
                            lastName: true,
                            email: true,
                            bio: true,
                            cargo: true,

                        }
                    }
                }
            })

            if (contracts) {
                return res.send(contracts);
            }
        }

        const contracts = await contractFunctions.contrato.findMany({
            where: {
                personalId: id,
                status: status
            },
            include: {
                aluno: {
                    select: {
                        name: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
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
