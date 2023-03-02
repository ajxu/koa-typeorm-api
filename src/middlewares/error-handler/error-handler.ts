import { Context, Next } from "koa";

/**
 * Common error controller. In case of error,  set the error in state else calls next()
 * @param ctx - global context
 * @param next - Next middleware
 */
export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    ctx.state.error = error;
  }
};
