import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { prismaDB } from '../../connection';

export const createUserTrpc = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string()
    })
  )
  .mutation(async (opts) => {
    const user = await prismaDB.users.create({
      data: opts.input
    });

    return user;
  });
