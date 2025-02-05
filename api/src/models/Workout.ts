import { z } from "zod"
import { Prisma } from "@prisma/client";

const ExerciseSchema = z.object({
    name: z.string().min(1, "O nome do exercício é obrigatório"),
    reps: z.union([z.string(), z.number()]).refine((val) => {
        if (typeof val === 'string') {
            return !isNaN(Number(val)) && Number(val) > 0;
        } else {
            return val > 0;
        }
    }, "O número de repetições deve ser um número positivo")
});
const ExercisesSchema = z.array(ExerciseSchema);

export const WorkoutCreateInput = z.object({
    title: z.string().min(2, "O título deve ter mais de 2 caracteres").max(20, "O título deve ter menos de 20 caracteres"),
    description: z.string().min(2, "A string deve ter mais de 2 caracteres").max(35, "O título deve ter menos de 35 caracteres"),
    personalId: z.number(),
    alunoId: z.number(),
    exercises: ExercisesSchema
}) satisfies z.Schema<Prisma.TreinoUncheckedCreateInput>;

