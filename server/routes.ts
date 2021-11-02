import { Application } from 'express';

import sheetsRouter from './api/v1/controllers/sheets/router';
import sheetsRouterV2 from './api/v2/controllers/sheets/router';
import rowsRouterV2 from './api/v2/controllers/rows/router';

export default function routes(app: Application): void {
  app.use('/api/v1/sheets', sheetsRouter);
  app.use('/api/v2/sheets', sheetsRouterV2);
  app.use('/api/v2/sheets', rowsRouterV2);
}
