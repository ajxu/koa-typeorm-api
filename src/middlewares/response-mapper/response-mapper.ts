import { ErrorResponse, SuccessResponse } from "../../dto/common"

/**
 * Response mapper to handle all the response/errors which to be added as middleware
 * @param ctx global context
 * @param next next function
 * @return ctx with status code and response body
 */
 export const responseMapper = async (ctx: any, next: any) => {
    await next();
    const {
      response: resp,
      error
    }: {
      response: SuccessResponse;
      error: Error;
    } = ctx.state;

    
    if (error) {
    ctx.status = 500;
    const errorResponse = makeErrorResponse(error.message!);

    ctx.body = errorResponse;
     
    } else {
      
      if(resp && resp.data){
        ctx.status = 200;
        ctx.body = makeSuccessResponse((resp as SuccessResponse).data);
      }
      
    }
  
    return ctx;
  };

/**
 * Creates error response object
 * @param errorCode error code to return
 * @param details details of the error if any (Optional)
 * @returns error object with error code
 */
export const makeErrorResponse = (message: string): ErrorResponse => {
    return {
      code: "Error",
      message: message
    };
  };

  /**
 * Creates success response object
 * @param resp response data
 * @param code status code
 * @returns returns the success object with code
 */
export const makeSuccessResponse = <ResponseType>(
    resp: ResponseType
  ): SuccessResponse<ResponseType> => {
    return { code: "OK", data: resp };
  };

/**
 * Sets response in the koa context state
 * @param ctx global koa context
 * @param response response data
 * @param successCode success status code
 * @returns void
 */
export const setSuccessResponse = <ResponseType>(
  ctx: any,
  response: ResponseType,
): void => {
  ctx.state.response = { code: "OK", data: response };
};