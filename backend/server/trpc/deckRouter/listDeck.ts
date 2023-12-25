import { prismaDB } from '../../connection';
import { publicProcedure } from '../trpc';

export const listDeckTrpc = publicProcedure.query(async () => {
  return await prismaDB.cardDecks.findMany();
});
