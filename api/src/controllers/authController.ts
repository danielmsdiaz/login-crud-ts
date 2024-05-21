import bycript from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Request, Response } from "express";
import { userFunctions } from "../services/user";

dotenv.config();

const SECRET = process.env.SECRET;

export const login = async (req: Request, res: Response) => {
    const data: {name: string, email: string} = { name: req.body.name, email: req.body.email };

    try {
        const user = await userFunctions.user.findFirstOrThrow({
            where: {
                name: data.name,
                email: data.email
            }
        })

        //ver questão do password
    }
    catch (err: any) {
        res.send(err.name);
    }

}