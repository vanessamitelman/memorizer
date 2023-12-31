"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const trpc_1 = require("../trpc");
const listUsers_1 = require("./listUsers");
const createUser_1 = require("./createUser");
const getUser_1 = require("./getUser");
exports.usersRouter = (0, trpc_1.router)({
    list: listUsers_1.listUserTrpc,
    createUser: createUser_1.createUserTrpc,
    getUser: getUser_1.getUserTrpc
});
