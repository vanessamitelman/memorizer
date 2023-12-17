import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';
import { decode } from 'jwt-js-decode';
import { formatDate } from '../../utils/dateFormatter';

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    return await prismaDB.users.findMany();
  }),
  createUser: publicProcedure
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
          password: opts.input.password,
          createDate: formatDate(new Date()),
          lastLoggedIn: formatDate(new Date()),
          isLoggedIn: 1
        }
      });
      return newUser;
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async (opts) => {
      const loginUser = await prismaDB.users.update({
        data: {
          lastLoggedIn: formatDate(new Date()),
          isLoggedIn: 1
        },
        where: {
          id: opts.input.id
        }
      });
      return loginUser;
    }),
  googleUser: publicProcedure
    .input(
      z.object({
        credential: z.string()
      })
    )
    .mutation(async (opts) => {
      const {
        payload: { email, sub }
      } = decode(opts.input.credential);
      const existingUser = await prismaDB.users.findFirst({
        where: {
          email
        }
      });
      if (existingUser) {
        const updateUser = await prismaDB.users.update({
          where: {
            id: existingUser.id
          },
          data: {
            lastLoggedIn: formatDate(new Date()),
            isLoggedIn: 1
          }
        });
        return updateUser;
      }
      const createGoogleUser = await prismaDB.users.create({
        data: {
          email,
          googleId: sub,
          createDate: formatDate(new Date()),
          lastLoggedIn: formatDate(new Date()),
          isLoggedIn: 1
        }
      });
      return createGoogleUser;
    }),
  getUser: publicProcedure.input(z.number()).query(async (opts) => {
    const user = await prismaDB.users.findFirst({
      where: {
        id: opts.input
      }
    });
    return user;
  }),
  getUserByEmail: publicProcedure.input(z.string()).query(async (opts) => {
    const user = await prismaDB.users.findFirst({
      where: {
        email: opts.input
      }
    });
    return user;
  })
});
