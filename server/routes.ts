import { Application } from 'express';

import sheetsRouter from './api/controllers/sheets/router';

export default function routes(app: Application): void {
  app.use('/api/v1/sheets', sheetsRouter);
}
