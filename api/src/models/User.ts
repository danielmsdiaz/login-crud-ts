import { z } from "zod"
import { Prisma } from "@prisma/client";

export const UserCreateInput = z.object({
    name: z.string().min(2, "O nome deve ter mais de 10 caracteres").max(10, "O nome deve ter menos de 10 caracteres"),
    email: z.string().email("O email precisa ser válido"),
    password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
    type: z.number()
  }) satisfies z.Schema<Prisma.UserUncheckedCreateInput>
