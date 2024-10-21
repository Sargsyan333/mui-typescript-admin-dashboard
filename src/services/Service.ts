/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComposedError } from 'services/errors/ComposerError';
import { ServiceError } from 'services/helperTypes';
import { ServiceCallsArgs } from 'services/ServiceCallsArgs';

export abstract class Service {
  currentMethod!: string;

  getServiceError(error: Error | ComposedError): ServiceError {
    const requestedCallArgs =
      ServiceCallsArgs.Instance.getCallArgsInfoByMethodName(
        this.constructor.name,
        this.currentMethod,
      );

    const serviceError = new ServiceError();
    serviceError.serviceName = this.constructor.name;
    serviceError.method = this.currentMethod;
    serviceError.args = requestedCallArgs;

    if (error instanceof ComposedError) {
      serviceError.composedError = error;
    } else {
      serviceError.error = error;
    }

    return serviceError;
  }
}
