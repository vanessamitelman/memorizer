"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const zod_1 = require("zod");
const connection_1 = require("../../connection");
const trpc_1 = require("../trpc");
exports.usersRouter = (0, trpc_1.router)({
    list: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        return yield connection_1.prismaDB.users.findMany();
    })),
    createUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        createDate: zod_1.z.string(),
        lastLoggedIn: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const googleUser = yield connection_1.prismaDB.users.create({
            data: opts.input
        });
        return googleUser;
    })),
    createGoogleUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        googleEmail: zod_1.z.string(),
        googleId: zod_1.z.string(),
        createDate: zod_1.z.string(),
        lastLoggedIn: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const googleUser = yield connection_1.prismaDB.users.create({
            data: opts.input
        });
        return googleUser;
    })),
    bookEdit: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        title: zod_1.z.string(),
        authorId: zod_1.z.string(),
        description: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield connection_1.prismaDB.book.update({
            data: {
                title: opts.input.title,
                description: opts.input.description,
                authorId: opts.input.authorId
            },
            where: {
                id: opts.input.id
            }
        });
        return book;
    }))
});
