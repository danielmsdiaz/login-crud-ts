import { Request, Response } from "express";
import { Prisma, Prisma as PrismaClient } from "@prisma/client";
import { userFunctions } from "../services/user";
import { z } from "zod"
import bycript from "bcrypt"


export const register = async (req: Request, res: Response) => {
    let data: PrismaClient.UserCreateInput = { name: req.body.name, email: req.body.email, password: req.body.password, type: req.body.userType };
    
    try {
        const hashedPassword = await bycript.hash(data.password, 10);
        data.password = hashedPassword;      
        
        const user = await userFunctions.user.create({
            data
        })
        
        res.status(201).json({ "User": user });
    }
    catch (err: any) {
        if (err instanceof z.ZodError) {
            res.send(err.issues[0].message);
        }
        else {
            res.status(400).send(err)
        }
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const param: string = req.params.id;
        const id: number = parseInt(param);

        if (isNaN(id)) {
            throw Error("ID inválido")
        }

        const user = await userFunctions.user.findUnique({
            where: {
                id: id
            },
        })

        if (user) {
            const result = await userFunctions.user.delete({
                where: {
                    id: user.id
                },
            })

            return res.send(result);
        }

        return res.send("Usuário inexistente");

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