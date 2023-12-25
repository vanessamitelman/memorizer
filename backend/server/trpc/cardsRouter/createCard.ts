import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { prismaDB } from '../../connection';

export const createCardTrpc = publicProcedure
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
  });
