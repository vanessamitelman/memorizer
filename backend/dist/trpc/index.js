"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const cardsRouter_1 = require("./cardsRouter");
const trpc_1 = require("./trpc");
exports.appRouter = (0, trpc_1.router)({
    cards: cardsRouter_1.cardsRouter
});
