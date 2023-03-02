import { ParameterizedContext } from "koa";
import { AUTH_KEY_COOKIE_NAME } from "../constants";

/**
 * Get and returns AUTH_KEY_COOKIE_NAME from header cookie
 * @param ctx - context
 */
 export const getCookie = (ctx: ParameterizedContext) => {
  return ctx.cookies.get(AUTH_KEY_COOKIE_NAME) || "";
};
