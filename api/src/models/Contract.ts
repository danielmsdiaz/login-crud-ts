import { z } from "zod"
import { Prisma } from "@prisma/client";

export const ContractCreateInput = z.object({
    alunoId: z.number(),
    personalId: z.number()
}) satisfies z.Schema<Prisma.ContratoUncheckedCreateInput>
