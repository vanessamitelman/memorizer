import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';

export const decksRouter = router({
  list: publicProcedure.query(async () => {
    return await prismaDB.cardDecks.findMany();
  })
});
