import { prismaDB } from '../../connection';
import { publicProcedure } from '../trpc';

export const listStatsTrpc = publicProcedure.query(async () => {
  return await prismaDB.statistics.findMany();
});
