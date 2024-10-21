import { AxiosError } from 'axios';

import { ComposedError } from 'services/errors/ComposerError';

export class ComposedRequestError extends ComposedError {
  name = 'ComposedRequestError';

  public readonly message: string | AxiosError;

  public readonly code: string = '';

  public readonly error: AxiosError;

  private globallyHandled = false;

  constructor(error: AxiosError) {
    super();
    this.error = error;

    console.log(error);

    const statusCode = error.response ? error.response.status : null;

    switch (statusCode) {
      case 401:
        this.message = 'Please login to access this page';
        this.code = 'unauthenticated';
        break;
      case 404:
        this.message =
          'The requested resource does not exist or has been deleted';
        this.code = 'not_found';
        break;
      case 400:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.code = error.response?.data?.code;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.message = error.response?.data[0]?.errorMessage || error;
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.message = error.response?.data[0]?.errorMessage || error;
        this.code = 'something_went_wrong';
    }
  }

  public getError(): AxiosError {
    return this.error;
  }

  public handleGlobally(): void {
    if (this.globallyHandled) {
      return;
    }

    this.globallyHandled = true;
  }

  getStatusCode(): number | null | undefined {
    const statusCode = this.error.response ? this.error.response.status : null;
    return statusCode;
  }
}
