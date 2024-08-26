import { z } from "zod"
import { Prisma } from "@prisma/client";

export const UserCreateInput = z.object({
  name: z.string().min(2, "O nome deve ter mais de 2 caracteres").max(10, "O nome deve ter menos de 10 caracteres"),
  email: z.string().email("O email precisa ser válido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
  type: z.number()
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>


export const UserEditInput = z.object({
  username: z.string().min(2, "O nome deve ter mais de 2 caracteres").max(10, "O nome deve ter menos de 10 caracteres"),
  photoUrl: z.string(),
  lastName: z.string().min(2, "O nome deve ter mais de 2 caracteres").max(10, "O nome deve ter menos de 10 caracteres"),
  cep: z.string(),
  logradouro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  pais: z.string(),
  preco: z.number().nullable(),
  cargo: z.string().nullable(),
  especial: z.array(z.string()).optional(),
  status: z.boolean(),
}) satisfies z.Schema<Prisma.UserUncheckedUpdateInput>
