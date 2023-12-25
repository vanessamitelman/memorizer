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
const jwt_js_decode_1 = require("jwt-js-decode");
const dateFormatter_1 = require("../../utils/dateFormatter");
const listUsers_1 = require("./listUsers");
exports.usersRouter = (0, trpc_1.router)({
    list: listUsers_1.listUserTrpc,
    createUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield connection_1.prismaDB.users.create({
            data: {
                email: opts.input.email,
                password: opts.input.password,
                createDate: (0, dateFormatter_1.formatDate)(new Date()),
                lastLoggedIn: (0, dateFormatter_1.formatDate)(new Date()),
                isLoggedIn: 1
            }
        });
        return newUser;
    })),
    loginUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.number()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const loginUser = yield connection_1.prismaDB.users.update({
            data: {
                lastLoggedIn: (0, dateFormatter_1.formatDate)(new Date()),
                isLoggedIn: 1
            },
            where: {
                id: opts.input.id
            }
        });
        return loginUser;
    })),
    googleUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        credential: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { payload: { email, sub } } = (0, jwt_js_decode_1.decode)(opts.input.credential);
        const existingUser = yield connection_1.prismaDB.users.findFirst({
            where: {
                email
            }
        });
        if (existingUser) {
            const updateUser = yield connection_1.prismaDB.users.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    lastLoggedIn: (0, dateFormatter_1.formatDate)(new Date()),
                    isLoggedIn: 1
                }
            });
            return updateUser;
        }
        const createGoogleUser = yield connection_1.prismaDB.users.create({
            data: {
                email,
                googleId: sub,
                createDate: (0, dateFormatter_1.formatDate)(new Date()),
                lastLoggedIn: (0, dateFormatter_1.formatDate)(new Date()),
                isLoggedIn: 1
            }
        });
        return createGoogleUser;
    })),
    getUser: trpc_1.publicProcedure.input(zod_1.z.string()).query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield connection_1.prismaDB.users.findUnique({
            where: {
                email: opts.input
            }
        });
        return user;
    }))
});
