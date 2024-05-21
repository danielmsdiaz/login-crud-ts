import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let sucess = false;

        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(" ");
            if (authType === "Bearer") {
                try {
                    const decoded = jwt.verify(token, process.env.SECRET as string);
                    sucess = true;
                }
                catch (err) {
                    console.log(err);
                }
            }
        }

        if (sucess) {
            next();
        }
        else {
            res.status(403).send("Não autorizado!");
        }
    }
}