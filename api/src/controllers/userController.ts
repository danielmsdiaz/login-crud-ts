import { Request, Response } from "express";
import { User } from "../models/User";

export const register = (req: Request, res: Response) => {
    const user: User = { name: req.body.name, password: req.body.password };
    try {
        res.json({ "User": user });
    }
    catch (error: any) {
        return res.send(error.message);
    }
}