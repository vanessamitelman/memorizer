import { router } from '../trpc';
import { createUser } from './createUser';
import { loginUser } from './loginUser';

export const usersRouter = router({
  login: loginUser,
  create: createUser
});
