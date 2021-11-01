import express, { Application } from 'express';
import path from 'path';
import http from 'http';
import os from 'os';
import cors, { CorsOptions } from 'cors';
import * as OpenApiValidator from 'express-openapi-validator';

import l from './logger';
import errorHandler from '../api/middlewares/error.handler';

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

    const swaggerConfig = path.join(__dirname, './swagger-config.yml');
    const apiSpecV1 = path.join(__dirname, '../api/v1/spec.yml');
    const apiSpecV2 = path.join(__dirname, '../api/v2/spec.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
    const validateRequests = !!(
      process.env.OPENAPI_ENABLE_REQUEST_VALIDATION &&
      process.env.OPENAPI_ENABLE_REQUEST_VALIDATION.toLowerCase() === 'true'
    );
    const validateApiSpec = !!(
      process.env.OPENAPI_ENABLE_API_SPEC_VALIDATION &&
      process.env.OPENAPI_ENABLE_API_SPEC_VALIDATION.toLowerCase() === 'true'
    );
    app.use('/swagger-config', express.static(swaggerConfig));
    app.use('/api/v1/spec', express.static(apiSpecV1));
    app.use(
      OpenApiValidator.middleware({
        apiSpec: apiSpecV1,
        validateResponses,
        validateRequests,
        validateApiSpec,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
    app.use('/api/v2/spec', express.static(apiSpecV2));
    app.use(
      OpenApiValidator.middleware({
        apiSpec: apiSpecV2,
        validateResponses,
        validateRequests,
        validateApiSpec,
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
