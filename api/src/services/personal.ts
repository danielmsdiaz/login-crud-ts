import { WorkoutCreateInput } from "../models/Workout";
import { prisma } from "../libs/prisma";

export const personalFunctions = prisma.$extends({
    query: {
        treino: {
            create({ args, query }) {
                args.data = WorkoutCreateInput.parse(args.data);
                return query(args);
            },
            update({ args, query }) {
                args.data = WorkoutCreateInput.partial().parse(args.data);
                return query(args);
            },
            delete({ args, query }) {
                return query(args);
            }
        },
    },
});