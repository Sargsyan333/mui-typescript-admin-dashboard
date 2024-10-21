/* eslint-disable @typescript-eslint/no-explicit-any */
type MethodLogType = {
  [propKey: string]: any[];
};

export class ServiceCallsArgs {
  // eslint-disable-next-line no-use-before-define
  private static instance: ServiceCallsArgs;

  private methodArgsLogs = new Map<string, MethodLogType>();

  public static get Instance(): ServiceCallsArgs {
    if (!ServiceCallsArgs.instance) {
      ServiceCallsArgs.instance = new ServiceCallsArgs();
    }

    return ServiceCallsArgs.instance;
  }

  logMethodCall(serviceName: string, methodName: string, args: any[]) {
    if (this.methodArgsLogs.has(serviceName)) {
      let callLogs = this.methodArgsLogs.get(serviceName);
      if (!callLogs) {
        callLogs = {};
      }

      callLogs[methodName] = args;
      this.methodArgsLogs.set(serviceName, callLogs);
    } else {
      this.methodArgsLogs.set(serviceName, {
        [methodName]: args,
      });
    }
  }

  getCallArgsInfoByMethodName(
    serviceName: string,
    methodName: string,
  ): any[] | null {
    if (!serviceName || !methodName) {
      return null;
    }

    if (!this.methodArgsLogs.has(serviceName)) {
      return null;
    }

    const callLogs = this.methodArgsLogs.get(serviceName);
    if (!callLogs?.[methodName]) {
      return null;
    }

    return callLogs[methodName];
  }
}
