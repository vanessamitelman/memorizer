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
exports.publicProcedure = exports.router = exports.login_middleware = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const connection_1 = require("../connection");
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = server_1.initTRPC.context().create();
exports.login_middleware = t.middleware((opts) => __awaiter(void 0, void 0, void 0, function* () {
    // check if has a session
    const session_temp = opts.ctx.req.cookies['session'];
    const session_zod = zod_1.z.string().safeParse(session_temp);
    if (!session_zod.success) {
        throw new server_1.TRPCError({
            message: 'User is not logged in!',
            code: 'UNAUTHORIZED'
        });
    }
    const session = session_zod.data;
    const session_from_db = yield connection_1.prismaDB.session.findUnique({
        where: {
            id: session
        }
    });
    if (session_from_db === null) {
        throw new server_1.TRPCError({
            message: 'User session does not exists',
            code: 'UNAUTHORIZED'
        });
    }
    if (session_from_db.expires < new Date()) {
        yield connection_1.prismaDB.session.delete({
            where: {
                id: session
            }
        });
        throw new server_1.TRPCError({
            message: 'User session has expired',
            code: 'UNAUTHORIZED'
        });
    }
    return opts.next();
}));
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
exports.router = t.router;
exports.publicProcedure = t.procedure;
