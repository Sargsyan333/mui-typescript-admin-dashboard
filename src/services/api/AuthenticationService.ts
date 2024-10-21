import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { annotateNameAsync, ServiceError } from 'services/helperTypes';
import {
  RequestNewPasswordRequestDto,
  RequestNewPasswordResponseDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  SignInRequestDto,
  SignInResponseDto,
} from 'services/models/Authentication';

const apiPath = process.env.REACT_APP_AUTH_API_BASE_URL;

class AuthenticationService extends Service {
  @annotateNameAsync
  async signIn(requestData: SignInRequestDto) {
    try {
      return await httpClient.post<SignInResponseDto | ServiceError>(
        `${apiPath}/auth` ,
        undefined,
        requestData,
        SignInResponseDto,
        true
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  @annotateNameAsync
  async requestNewPassword(requestData: RequestNewPasswordRequestDto) {
    try {
      return await httpClient.post<RequestNewPasswordResponseDto | ServiceError>(
        `${apiPath}/request-password-reset` ,
        undefined,
        requestData,
        RequestNewPasswordResponseDto,
        true
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async resetPassword(requestData: ResetPasswordRequestDto) {
    try {
      return await httpClient.post<ResetPasswordResponseDto | ServiceError>(
        `${apiPath}/reset-password` ,
        undefined,
        requestData,
        ResetPasswordResponseDto,
        true
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default AuthenticationService;