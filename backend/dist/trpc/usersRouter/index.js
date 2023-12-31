"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const trpc_1 = require("../trpc");
const createUser_1 = require("./createUser");
const loginUser_1 = require("./loginUser");
exports.usersRouter = (0, trpc_1.router)({
    login: loginUser_1.loginUser,
    create: createUser_1.createUser
});
