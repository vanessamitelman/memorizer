import { cardsRouter } from './cardsRouter';
import { router } from './trpc';

export const appRouter = router({
  cards: cardsRouter
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
