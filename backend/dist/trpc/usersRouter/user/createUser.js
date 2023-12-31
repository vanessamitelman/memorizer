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
exports.createUser = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const connection_1 = require("../../connection");
const hashPassword_1 = require("../../utils/hashPassword");
exports.createUser = trpc_1.publicProcedure.input(zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
})).mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
    const password_hashed = yield (0, hashPassword_1.hashPassword)(opts.input.password);
    console.log(password_hashed);
    const user = yield connection_1.prisma.user.create({
        data: {
            email: opts.input.email,
            password: password_hashed,
        }
    });
    return user;
}));
