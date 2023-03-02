import Router from "koa-router";
import testRoute from "./test-route";

const routers = new Router();

routers.use('/test', testRoute);

export default routers.routes();