import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';

export const statisticsRouter = router({
  list: publicProcedure.query(async () => {
    return await prismaDB.statistics.findMany();
  })
});
