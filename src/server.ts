import Koa, { Context, Next } from "koa";
import koaHelmet from "koa-helmet";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import cors from "koa-cors";
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig";

import routers from "./routes";
// import Router from "koa-router";
import { responseMapper } from "./middlewares/response-mapper";
import { authenticator } from "./middlewares/authentication/authentication";
import { errorHandler } from "./middlewares/error-handler/error-handler";

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection(config).then(async connection => {

  const app = new Koa();
  // console.log('db connected!', getConnection());

  // middlewares
  app.use(json());
  app.use(bodyParser({ formLimit: "2mb", jsonLimit: "2mb" }));

  // to make secure header
  app.use(cors({
    origin: '*'
  }));
  app.use(koaHelmet());

  // Authentication Middleware
  app.use(authenticator);

  // response mapper
  app.use(responseMapper);

  // error handler
  app.use(errorHandler)

  // routes
  app.use(routers.routes());

  app.on("error", (error: Error, ctx: any): void => {
    console.error(error)
    ctx.body = error;
  });

  const port = process.env.PORT || 3000;
  app.listen(port);

  console.log("Application is up and running on port:", port);

}).catch(error => console.log("TypeORM connection error: ", error));


