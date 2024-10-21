import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { annotateNameAsync, ServiceError } from 'services/helperTypes';
import {
  ChangeUserPasswordRequestDto,
  ChangeUserPasswordResponseDto,
  SetUserLanguageRequestDto,
  SetUserLanguageResponseDto,
} from 'services/models/User';

const apiPath = "/user";

class UserService extends Service {
  @annotateNameAsync
  async setLanguage(requestData: SetUserLanguageRequestDto) {
    try {
      return await httpClient.post<SetUserLanguageResponseDto | ServiceError>(
        `${apiPath}/language` ,
        undefined,
        requestData,
        SetUserLanguageResponseDto,
        true
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  @annotateNameAsync
  async changePassword(requestData: ChangeUserPasswordRequestDto) {
    try {
      return await httpClient.post<ChangeUserPasswordResponseDto | ServiceError>(
        `${apiPath}/change-password` ,
        undefined,
        requestData,
        ChangeUserPasswordResponseDto,
        true
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default UserService;