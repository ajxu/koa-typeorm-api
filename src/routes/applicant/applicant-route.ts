import { Context, Next } from "koa";
import Router from "koa-router";
import ApplicantController from "../../controllers/applicant";
import { setSuccessResponse } from "../../middlewares/response-mapper";

const router = new Router();
const controller = new ApplicantController();

router.post("/", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.create(ctx));
});

router.get("/", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.findAll(ctx));
});

router.get("/:guid", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.findOne(ctx));
});

router.delete("/:guid", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, await controller.delete(ctx));
});

export default router.routes();