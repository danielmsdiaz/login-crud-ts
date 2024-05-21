import bycript from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Request, Response } from "express";
import { userFunctions } from "../services/user";

dotenv.config();
const SECRET = process.env.SECRET;

export const login = async (req: Request, res: Response) => {
    const data: {email: string, password: string} = {email: req.body.email, password: req.body.password};

    try {
        const user = await userFunctions.user.findFirstOrThrow({
            where: {
                email: data.email
            }
        })

        const validate = bycript.compareSync(data.password, user.password);
        if(!validate){
            throw Error("Senha incorreta!")
        }

        const token = jwt.sign({id: user.id}, SECRET as string);

        res.json({"Usuário Logado com sucesso!": {"token": token}})
    }
    catch (err: any) {
        res.send(err.message);
    }

}