import { prismaDB } from '../../connection';
import { checkPassword } from '../../utils/checkPassword';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const loginUser = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string()
    })
  )
  .mutation(async (opts) => {
    const user = await prismaDB.users.findUnique({
      where: {
        email: opts.input.email
      }
    });
    if (user === null) return user;
    const is_password_matched = await checkPassword(
      opts.input.password,
      user?.password
    );

    if (is_password_matched) return user;

    return null;
  });
