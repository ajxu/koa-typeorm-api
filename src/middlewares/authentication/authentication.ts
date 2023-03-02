import { Context } from "koa";
import { getCookie } from "../../common/utils";
import { StatusCode } from "../../dto/common";
import dotenv from "dotenv";
dotenv.config();

/**
 * 
 * @param ctx 
 * @param next 
 * @returns 
 */
export const authenticator =  async (ctx: Context, next: () => Promise<any>) => {
	await next();
	return;
	// const authKeyFromHeader = getCookie(ctx);

	// const apiAuthKey = process.env.API_AUTH_KEY || "";


	// if (authKeyFromHeader && authKeyFromHeader === apiAuthKey) {
	// 	await next();
	// 	return;
	// }

	// ctx.status = StatusCode.AuthError;
	// ctx.body = "Invalid access";
	// return ctx;
	
}
