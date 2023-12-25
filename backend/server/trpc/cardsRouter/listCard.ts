import { prismaDB } from '../../connection';
import { publicProcedure } from '../trpc';

export const listCardTrpc = publicProcedure.query(async () => {
  return await prismaDB.cards.findMany();
});
