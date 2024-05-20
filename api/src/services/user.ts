import { UserCreateInput } from "../models/User";
import { prisma } from "../libs/prisma";

export const userFunctions = prisma.$extends({
    query: {
        user: {
            create({ args, query }) {
                args.data = UserCreateInput.parse(args.data)
                return query(args)
            },
            update({ args, query }) {
                args.data = UserCreateInput.partial().parse(args.data)
                return query(args)
            },
            updateMany({ args, query }) {
                args.data = UserCreateInput.partial().parse(args.data)
                return query(args)
            },
            upsert({ args, query }) {
                args.create = UserCreateInput.parse(args.create)
                args.update = UserCreateInput.partial().parse(args.update)
                return query(args)
            },
        },
    },
})