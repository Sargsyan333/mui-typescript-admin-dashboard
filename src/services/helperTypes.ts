/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComposedError } from 'services/errors/ComposerError';

export class ServiceError {
  serviceName!: string;

  method!: string;

  args!: any[] | null;

  error!: Error;

  composedError!: ComposedError;
}

export function annotateNameAsync(target: any, name: any, desc: any) {
  const method = desc.value;
  desc.value = async function (...args: any[]) {
    this.currentMethod = name;
    return method.apply(this, args);
  };
}
