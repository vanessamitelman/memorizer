import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { prismaDB } from '../../connection';
import { hashPassword } from '../../utils/hashPassword';

export const createUser = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string()
    })
  )
  .mutation(async (opts) => {
    const checkUserExists = await prismaDB.users.findUnique({
      where: {
        email: opts.input.email
      }
    });
    const password_hashed = await hashPassword(opts.input.password);
    console.log(password_hashed);
    const user = await prismaDB.users.create({
      data: {
        email: opts.input.email,
        password: password_hashed
      }
    });

    return user;
  });
