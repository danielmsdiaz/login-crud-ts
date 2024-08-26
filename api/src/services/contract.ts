import { ContractCreateInput } from "../models/Contract";
import { prisma } from "../libs/prisma";

export const contractFunctions = prisma.$extends({
    query: {
        contrato: {
            create({ args, query }) {
                args.data = ContractCreateInput.parse(args.data);
                return query(args);
            },
            update({ args, query }) {
                args.data = ContractCreateInput.partial().parse(args.data);
                return query(args);
            },
            delete({ args, query }) {
                return query(args);
            }
        },
    },
});