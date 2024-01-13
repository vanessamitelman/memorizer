import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/index';
import { createContext } from './utils/trpcExpressContext';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true
  })
);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,

    createContext: createContext
  })
);
app.get('/', (req, res) => {
  res.send({
    message: 'hey ma'
  });
});

app.listen(process?.env?.PORT ?? 3301, () => {
  console.log('listening on 3301 ' + process?.env?.PORT ?? 3301);
});
