import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';

export const cardsRouter = router({
  list: publicProcedure.query(async () => {
    return await prismaDB.cards.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        front: z.string(),
        back: z.string(),
        hint: z.string(),
        deckId: z.number()
      })
    )
    .mutation(async (opts) => {
      const cards = await prismaDB.cards.create({
        data: opts.input
      });
      return cards;
    })
});
