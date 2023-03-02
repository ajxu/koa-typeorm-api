import { Context, Next } from "koa";
import Router from "koa-router";
import sendEmailSMTP from "../../common/email";
import { setSuccessResponse } from "../../middlewares/response-mapper";

const router = new Router();

router.get("/ping", async (ctx: Context, next: Next) => {
  setSuccessResponse(ctx, 'pong');
});

router.post("/email", async (ctx: Context, next: Next) => {
  try {
    interface TestEmailRequest {
      email: string;
    }
    const data = <TestEmailRequest><unknown>ctx.request.body;
    const { email } = data;
    if (email) {
      const to = email;
      const subject = 'Test Email From Server';
      const bodyText = `Testing Text Email`;
      const bodyHtml = `<html>
      <head></head>
      <body>
        <h1>Test HTML Email</h1>
        <p>This is a test email</p>
      </body>
      </html>`;

      const responseMessage = await sendEmailSMTP(to, subject, bodyText, bodyHtml);

      setSuccessResponse(ctx, responseMessage);
    }
    else {
      throw new Error('email parameter is required in request')
    }
  }
  catch (err) {
    throw err;
  }

});

export default router.routes();