import { Request, Response } from "express";
import { Prisma as PrismaClient } from "@prisma/client";
import { userFunctions } from "../services/user";
import { z } from "zod"


export const register = async (req: Request, res: Response) => {
    const data: PrismaClient.UserCreateInput = { name: req.body.name, email: req.body.email };
    try {
        const user = await userFunctions.user.create({
            data
        })

        res.status(201).json({ "User": user });
    }
    catch (err: any) {
        if (err instanceof z.ZodError) {
            res.send(err.issues[0].message);
        }
        else{
            res.send(`Erro no campo ${err.meta.target}`)
        }
    }
}