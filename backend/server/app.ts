import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/index';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173']
  })
);
app.listen(3301, () => {
  console.log('listening on 3301');
});
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter
    // createContext,
  })
);
app.get('/', (req, res) => {
  res.send({
    message: 'hey ma'
  });
});
