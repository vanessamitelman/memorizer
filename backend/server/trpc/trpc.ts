import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from '../utils/trpcExpressContext';
import { z } from 'zod';
import { prismaDB } from '../connection';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

export const login_middleware = t.middleware(async (opts) => {
  // check if has a session
  const session_temp = opts.ctx.req.cookies['session'];
  const session_zod = z.string().safeParse(session_temp);
  if (!session_zod.success) {
    throw new TRPCError({
      message: 'User is not logged in!',
      code: 'UNAUTHORIZED'
    });
  }
  const session = session_zod.data;
  const session_from_db = await prismaDB.session.findUnique({
    where: {
      id: session
    }
  });
  if (session_from_db === null) {
    throw new TRPCError({
      message: 'User session does not exists',
      code: 'UNAUTHORIZED'
    });
  }
  if (session_from_db.expires < new Date()) {
    await prismaDB.session.delete({
      where: {
        id: session
      }
    });
    throw new TRPCError({
      message: 'User session has expired',
      code: 'UNAUTHORIZED'
    });
  }

  return opts.next();
});
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
