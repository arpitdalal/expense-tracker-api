import express, { Application } from 'express';
import path from 'path';
import http from 'http';
import os from 'os';
import cors, { CorsOptions } from 'cors';
import * as OpenApiValidator from 'express-openapi-validator';

import l from './logger';
import errorHandler from '../api/v1/middlewares/error.handler';

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    const corsOptions: CorsOptions = {
      origin: [
        'http://localhost:3000',
        process.env.NETLIFY_URL !== undefined && process.env.NETLIFY_URL,
      ],
      methods: ['POST', 'DELETE', 'PATCH'],
    };
    app.use(cors(corsOptions));
    app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(express.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(express.static(`${root}/public`));

    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
