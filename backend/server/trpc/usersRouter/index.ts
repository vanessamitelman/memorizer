import { router } from '../trpc';
import { listUserTrpc } from './listUsers';
import { createUserTrpc } from './createUser';
import { getUserTrpc } from './getUser';

export const usersRouter = router({
  list: listUserTrpc,
  createUser: createUserTrpc,
  getUser: getUserTrpc
});
