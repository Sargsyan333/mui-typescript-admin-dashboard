import { AxiosError } from 'axios';

export abstract class ComposedError {
  readonly message!: string | AxiosError;

  readonly code!: string;

  readonly error!: AxiosError;

  abstract handleGlobally(): void;

  abstract getError(): AxiosError;

  abstract getStatusCode(): number | null | undefined;
}
