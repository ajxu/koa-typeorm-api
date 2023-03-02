import Router from "koa-router";
import companyRoute from "./company/company-route";
import companyUserRoute from "./company-user/company-user-route";
import diagnosticRoute from "./diagnostic";

const routers = new Router({
  prefix: "/api"
});

routers.use("/company", companyRoute);
routers.use("/company-user", companyUserRoute);
routers.use("/diagnostic", diagnosticRoute);

export default routers;