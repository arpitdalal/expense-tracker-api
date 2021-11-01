# <p align=center>Expense Tracker Api</p>

![Heroku](http://heroku-badge.herokuapp.com/?app=arpit-expense-tracker&style=flat&svg=1&root=index.html)

This is an expense tracking api which uses Google sheets as it's database.

## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## How do I modify the example API and make it my own?

There are two key files:

1. `server/routes.ts` - This references the implementation of all of your routes. Add as many routes as you like and point each route your express handler functions.
2. `server/common/api.yaml` - This file contains your [OpenAPI spec](https://swagger.io/specification/). Describe your API here. It's recommended that you to declare any and all validation logic in this YAML. `express-no-stress-typescript` uses [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) to automatically handle all API validation based on what you've defined in the spec.

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Add `.env` file

Copy the `.env.example` file to `.env` in the project root folder

```shell
cp .env.example .env
```

Fill `GOOGLE_SERVICE_ACCOUNT_EMAIL` with the email provided in your GCP setup for Google sheets API. Fill `GOOGLE_PRIVATE_KEY` with the private key provided in the json document from GCP.

## Run It

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It

- Open your browser to [http://localhost:5000](http://localhost:5000)
- Invoke the `/spec` endpoint
  ```shell
  curl http://localhost:3000/api/v1/spec
  ```

## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Lint It

View linter output

```
npm run lint
```

Fix all linter errors

```
npm run lint
```
