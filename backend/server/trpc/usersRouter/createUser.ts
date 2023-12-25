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
    const newUser = await prismaDB.users.create({
      data: {
        email: opts.input.email,
        password: opts.input.password
      }
    });
    return newUser;
  });
