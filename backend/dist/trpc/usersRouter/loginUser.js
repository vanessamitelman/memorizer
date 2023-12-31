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
exports.loginUser = void 0;
const connection_1 = require("../../connection");
const checkPassword_1 = require("../../utils/checkPassword");
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.loginUser = trpc_1.publicProcedure
    .input(zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
}))
    .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield connection_1.prismaDB.users.findUnique({
        where: {
            email: opts.input.email
        }
    });
    if (user === null)
        return user;
    const is_password_matched = yield (0, checkPassword_1.checkPassword)(opts.input.password, user === null || user === void 0 ? void 0 : user.password);
    if (is_password_matched)
        return user;
    return null;
}));
