import { Context, Next } from "koa";
import Router from "koa-router";
import CompanyUserController from "../../controllers/company-user";
import { setSuccessResponse } from "../../middlewares/response-mapper";

const router = new Router();
const controller = new CompanyUserController();

router.get("/auth-list", async (ctx: Context, next: Next) => {
    setSuccessResponse(ctx, await controller.findAll(ctx));
});

export default router.routes();