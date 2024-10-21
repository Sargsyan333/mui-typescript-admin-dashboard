/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line max-classes-per-file
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { plainToInstance } from 'class-transformer';

import { QueryParams } from 'services/models/QueryParams';
import { ComposedRequestError } from 'services/errors/ComposedRequestError';
import { isAbsoluteUrl } from 'utils/url';
import { accessTokenKey } from 'constants/localStorage';
import Events from 'hooks/eventEmitter/EventEmitter';
import { AuthEvents } from 'types/events';

type RequestMethods =
  | 'head'
  | 'options'
  | 'put'
  | 'post'
  | 'patch'
  | 'delete'
  | 'get';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosInstanceBaseURL = axios.create({
  baseURL,
  withCredentials: false,
});

const axiosInstanceExternalURL = axios.create();

const currentExecutingRequests: {
  [key: string]: CancelTokenSource;
} = {};

const getUniqueKeyForRequest = (
  req: AxiosRequestConfig<any>,
): string | undefined => {
  if (req && req.method && req.url) {
    return `${req?.method}_${req?.url}`;
  }

  return '';
};

const authInterceptor = async (
  req: InternalAxiosRequestConfig<any>,
) => {
  if (localStorage.getItem(accessTokenKey)) {
    try {
      const tokenValue = JSON.parse(localStorage.getItem(accessTokenKey) || '');
      req.headers.Authorization = `Bearer ${tokenValue}`;
    } catch (error) {
      console.error(error);
    }
  }

  return req;
};

const onFulfilledInterceptor = (response: AxiosResponse) => {
  if (currentExecutingRequests[getUniqueKeyForRequest(response.config) || '']) {
    delete currentExecutingRequests[
      getUniqueKeyForRequest(response.config) || ''
    ];
  }

  // Store access token
  if (response.headers.authorization) {
    const authorizationHeaderValue = response.headers.authorization;
    const accessToken = authorizationHeaderValue.replace('Bearer ', '');

    Events.emit(AuthEvents.updateAccessToken, accessToken);
  }

  return response;
};

const onRejectedInterceptor = (error: AxiosError) => {
  if (axios.isCancel(error)) {
    let originalRequest = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.message && error.message.originalRequest) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      originalRequest = error.message.originalRequest;
    }

    if (
      originalRequest?.url &&
      currentExecutingRequests[getUniqueKeyForRequest(originalRequest) || '']
    ) {
      delete currentExecutingRequests[
        getUniqueKeyForRequest(originalRequest) || ''
      ];
    }
  }

  if (error?.response?.status === 401 && JSON.parse(localStorage.getItem(accessTokenKey) || '')) {
    Events.emit(AuthEvents.clearAccessToken);
  }

  const composedError = new ComposedRequestError(error);
  return Promise.reject(composedError);
};

axiosInstanceBaseURL.interceptors.request.use(authInterceptor);
axiosInstanceBaseURL.interceptors.response.use(
  onFulfilledInterceptor,
  onRejectedInterceptor,
);

axiosInstanceExternalURL.interceptors.response.use(
  onFulfilledInterceptor,
  onRejectedInterceptor,
);
class HttpClient {
  // eslint-disable-next-line no-use-before-define
  private static instance: HttpClient;

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  public async get<T>(
    url: string,
    queryParams: QueryParams | undefined,
    Model: any,
    cancelable = false,
  ): Promise<T> {
    const response = await axiosInstanceBaseURL.get(url, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
    });

    const data = await response.data;
    const dto = plainToInstance<T, AxiosResponse<T>>(Model, data);

    return dto as unknown as T;
  }

  public async getRaw(
    url: string,
    queryParams: QueryParams | undefined,
    cancelable = false,
  ): Promise<AxiosResponse['data']> {
    const response = await axiosInstanceBaseURL.get(url, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
    });

    return response;
  }

  public async post<T>(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    Model: any,
    cancelable = false,
    headers: RawAxiosRequestHeaders = { 'Content-Type': 'application/json' },
    configs = {},
  ): Promise<T> {
    const requestInstance = isAbsoluteUrl(url)
      ? axiosInstanceExternalURL
      : axiosInstanceBaseURL;

    if (isAbsoluteUrl(url)) {
      headers.App = 'admin';
    }

    const response = await requestInstance.post(url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
      headers,
      ...configs,
    });

    const data = await response.data;
    const dto = plainToInstance<T, AxiosResponse<T>>(Model, data);

    return dto as unknown as T;
  }

  public async postRaw(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    cancelable = false,
    headers = { 'Content-Type': 'application/json' },
  ): Promise<AxiosResponse['data']> {
    const response = await axiosInstanceBaseURL.post(url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
      headers,
    });

    return response;
  }

  public async put<T>(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    Model: any,
    cancelable = false,
    headers = { 'Content-Type': 'application/json' },
  ): Promise<T> {
    const response = await axiosInstanceBaseURL.put(url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
      headers,
    });

    const data = await response.data;
    const dto = plainToInstance<T, AxiosResponse<T>>(Model, data);

    return dto as unknown as T;
  }

  public async putRaw(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    cancelable = false,
  ): Promise<AxiosResponse['data']> {
    const response = await axiosInstanceBaseURL.put(url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
    });

    return response;
  }

  public async delete<T>(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    Model: any,
  ): Promise<T> {
    const response = await axiosInstanceBaseURL.delete(url, {
      params: queryParams?.getParamsFromRequest(),
      data: payload,
    });

    const data = await response.data;
    const dto = plainToInstance<T, AxiosResponse<T>>(Model, data);

    return dto as unknown as T;
  }

  public async deleteRaw(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
  ): Promise<AxiosResponse['data']> {
    const response = await axiosInstanceBaseURL.delete(url, {
      params: queryParams?.getParamsFromRequest(),
      data: payload,
    });

    return response;
  }

  public async patch<T>(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    Model: any,
    cancelable = false,
  ): Promise<T> {
    const response = await axiosInstanceBaseURL.patch(url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
    });

    const data = await response.data;
    const dto = plainToInstance<T, AxiosResponse<T>>(Model, data);

    return dto as unknown as T;
  }

  public async patchRaw(
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    cancelable = false,
  ): Promise<AxiosResponse['data']> {
    const response = await axiosInstanceBaseURL.patch(url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
    });

    return response;
  }

  public async customRequest<T>(
    method: RequestMethods,
    url: string,
    queryParams: QueryParams | undefined,
    payload: any,
    Model: any,
    cancelable = false,
    headers = { 'Content-Type': 'application/json' },
  ): Promise<T> {
    const response = await axiosInstanceBaseURL[method](url, payload, {
      params: queryParams?.getParamsFromRequest(),
      data: {
        cancelable,
      },
      headers,
    });

    const data = await response.data;
    const dto = plainToInstance<T, AxiosResponse<T>>(Model, data);

    return dto as unknown as T;
  }
}

export const httpClient = HttpClient.getInstance();
