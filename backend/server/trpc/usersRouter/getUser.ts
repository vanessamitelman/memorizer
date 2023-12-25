import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { prismaDB } from '../../connection';

export const getUserTrpc = publicProcedure
  .input(
    z.object({
      email: z.string()
    })
  )
  .query(async (opts) => {
    const user = await prismaDB.users.findUnique({
      where: { email: opts.input.email }
    });
    return user;
  });
