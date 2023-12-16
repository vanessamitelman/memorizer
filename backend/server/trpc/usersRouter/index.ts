import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    return await prismaDB.users.findMany();
  }),
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        createDate: z.string(),
        lastLoggedIn: z.string()
      })
    )
    .mutation(async (opts) => {
      const googleUser = await prismaDB.users.create({
        data: opts.input
      });
      return googleUser;
    }),
  createGoogleUser: publicProcedure
    .input(
      z.object({
        googleEmail: z.string(),
        googleId: z.string(),
        createDate: z.string(),
        lastLoggedIn: z.string()
      })
    )
    .mutation(async (opts) => {
      const googleUser = await prismaDB.users.create({
        data: opts.input
      });
      return googleUser;
    })
});
