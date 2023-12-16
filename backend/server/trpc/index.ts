import { cardsRouter } from './cardsRouter';
import { decksRouter } from './deckRouter';
import { statisticsRouter } from './statisticsRouter';
import { publicProcedure, router } from './trpc';
import { usersRouter } from './usersRouter';

export const appRouter = router({
  cards: cardsRouter,
  decks: decksRouter,
  statistics: statisticsRouter,
  users: usersRouter
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
