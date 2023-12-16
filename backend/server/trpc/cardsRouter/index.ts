import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';

export const cardsRouter = router({
  list: publicProcedure.query(async () => {
    return await prismaDB.cards.findMany();
  })
});
