export interface GeneralResponse {
  code: string;
}

export interface SuccessResponse<T = any> extends GeneralResponse {
  data?: T;
}

export interface ErrorResponse extends GeneralResponse {
  message: string;
  details?: any;
}

export enum StatusCode {
  AuthError = 401,
  serverError = 500
}