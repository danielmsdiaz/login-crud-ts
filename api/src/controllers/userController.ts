import { Request, Response } from "express";
import { Prisma, Prisma as PrismaClient } from "@prisma/client";
import { userFunctions } from "../services/user";
import { number, z } from "zod"
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

export const editUser = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const type: number = parseInt(req.params.type);
    let data: Prisma.UserUncheckedUpdateInput = {};

    try {
        if (type === 0) {
            data = {
                lastName: req.body.lastName,
                username: req.body.username,
                photoUrl: req.body.img,
                cep: req.body.zipCode,
                logradouro: req.body.street,
                cidade: req.body.city,
                estado: req.body.state,
                pais: req.body.country,
                status: true,
            };
        }
        else {
            data = {
                lastName: req.body.lastName,
                username: req.body.username,
                photoUrl: req.body.img,
                cep: req.body.zipCode,
                logradouro: req.body.street,
                cidade: req.body.city,
                estado: req.body.state,
                pais: req.body.country,
                preco: req.body.price,
                cargo: req.body.role,
                especial: req.body.specializations.split(',').map((item: string) => item.trim()),
                status: true,
            };
        }
        
        const user = await userFunctions.user.update({
            where: { id: id },
            data: data,
        });

        return res.json(user);
    } catch (err: any) {    
        if (err instanceof z.ZodError) {
            res.status(400).json({ error: err.issues[0].message });
        } else {
            res.status(400).json({ error: err.message });
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

export const getUserTypePersonal = async (req: Request, res: Response) => {
    try {
        const type: number = parseInt(req.params.type);

        if (isNaN(type)) {
            throw Error("Tipo inexistente")
        }

        const personals = await userFunctions.user.findMany({
            where: {
                type: type,
                status: true
            },
        })

        if (personals) {
            return res.send(personals);
        }

        return res.send("Não existem personais cadastrados");

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

export const getLoggedUser = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        if (isNaN(id)) {
            throw Error("Usuário inexistente")
        }

        const user = await userFunctions.user.findUnique({
            where: {
                id: id
            },
        })

        if (user) {
            return res.send(user);
        }

        return res.send("Não existe usuários cadastrados");

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