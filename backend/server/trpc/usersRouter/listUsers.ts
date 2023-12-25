import { prismaDB } from '../../connection';
import { publicProcedure } from '../trpc';

export const listUserTrpc = publicProcedure.query(async () => {
  return await prismaDB.users.findMany();
});
