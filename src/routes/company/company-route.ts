import { Context, Next } from "koa";
import Router from "koa-router";
import CompanyController from "../../controllers/company";
import { setSuccessResponse } from "../../middlewares/response-mapper";

const router = new Router();
const controller = new CompanyController();

router.post("/", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.create(ctx));
});

router.get("/", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.findAll(ctx));
});

router.get("/:company_uen", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.findOne(ctx));
});

router.put("/:company_uen", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.update(ctx));
});

router.delete("/:company_uen", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.delete(ctx));
});

export default router.routes();