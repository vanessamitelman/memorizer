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
exports.cardsRouter = void 0;
const zod_1 = require("zod");
const connection_1 = require("../../connection");
const trpc_1 = require("../trpc");
exports.cardsRouter = (0, trpc_1.router)({
    list: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        return yield connection_1.prismaDB.cards.findMany();
    })),
    create: trpc_1.publicProcedure
        .input(zod_1.z.object({
        front: zod_1.z.string(),
        back: zod_1.z.string(),
        hint: zod_1.z.string(),
        deckId: zod_1.z.number()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const cards = yield connection_1.prismaDB.cards.create({
            data: opts.input
        });
        return cards;
    }))
});
