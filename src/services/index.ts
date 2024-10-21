import axios from 'axios';

import { Service } from 'services/Service';
import { ServiceCallsArgs } from 'services/ServiceCallsArgs';
import AuthenticationService from 'services/api/AuthenticationService';
import UserService from 'services/api/UserService';
import CoworkerService from 'services/api/CoworkerService';
import ClientService from 'services/api/ClientService';
import ProjectService from 'services/api/ProjectService';
import SubprojectService from 'services/api/SubprojectService';

const baseURL = process.env.REACT_APP_BASE_URL;

function traceMethod<T extends Service>(obj: T) {
  const handler = Object.assign(obj, {
    get(target: any, propKey: string) {
      const origMethod = target[propKey];
      return (...args: any[]) => {
        ServiceCallsArgs.Instance.logMethodCall(
          obj.constructor.name,
          propKey,
          args,
        );

        const result = origMethod.apply(this, args);
        return result;
      };
    },
  });
  return new Proxy(obj, handler);
}

const createAxiosInstance = (endpoint = '/api') => (
  axios.create({
    baseURL: `${baseURL}${endpoint}`,
  })
);

export default createAxiosInstance;

export const authenticationService = traceMethod(new AuthenticationService());

export const userService = traceMethod(new UserService());

export const coworkerService = traceMethod(new CoworkerService());

export const clientService = traceMethod(new ClientService());

export const projectService = traceMethod(new ProjectService());

export const subprojectService = traceMethod(new SubprojectService());