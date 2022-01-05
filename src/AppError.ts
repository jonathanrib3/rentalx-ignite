type IHttpError = 400 | 401 | 402 | 403 | 404 | 405 | 500 | 501 | 502;

class AppError extends Error {
  public readonly message: string;
  public readonly status: IHttpError;

  constructor(status: IHttpError, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export { AppError };
