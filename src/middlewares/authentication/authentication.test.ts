import { Context } from "koa";
import { StatusCode } from "../../dto/common";
import { authenticator } from "./authentication";

describe("authentication", () => {
	const mockCtx = ({
		path: "",
		cookies: {
			get: () => undefined
		},
		request: {
			get: () => undefined
		},
		state: {}
	} as unknown) as Context;

  beforeEach(() => {
    jest.resetModules();
	});

	it("should throw authentication error when session token not matches", async () => {
		await authenticator(mockCtx, () => 
			 new Promise(resolve => resolve)
		).then(() => {
			expect(mockCtx.status).toEqual(StatusCode.AuthError);
		});
	});
});