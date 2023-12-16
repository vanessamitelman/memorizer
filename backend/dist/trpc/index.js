"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const cardsRouter_1 = require("./cardsRouter");
const deckRouter_1 = require("./deckRouter");
const statisticsRouter_1 = require("./statisticsRouter");
const trpc_1 = require("./trpc");
const usersRouter_1 = require("./usersRouter");
exports.appRouter = (0, trpc_1.router)({
    cards: cardsRouter_1.cardsRouter,
    decks: deckRouter_1.decksRouter,
    statistics: statisticsRouter_1.statisticsRouter,
    users: usersRouter_1.usersRouter
});
