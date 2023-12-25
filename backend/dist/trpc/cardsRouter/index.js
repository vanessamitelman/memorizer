"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsRouter = void 0;
const trpc_1 = require("../trpc");
const createCard_1 = require("./createCard");
const listCard_1 = require("./listCard");
exports.cardsRouter = (0, trpc_1.router)({
    list: listCard_1.listCardTrpc,
    create: createCard_1.createCardTrpc
});
