import { router } from '../trpc';
import { createCardTrpc } from './createCard';
import { listCardTrpc } from './listCard';

export const cardsRouter = router({
  list: listCardTrpc,
  create: createCardTrpc
});
