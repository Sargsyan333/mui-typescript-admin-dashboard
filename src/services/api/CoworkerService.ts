import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { annotateNameAsync, ServiceError } from 'services/helperTypes';
import {
  CreateCoworkerRequestDto,
  CreateCoworkerResponseDto,
  DeleteCoworkerResponseDto,
  FetchCoworkerListQueryParams,
  FetchCoworkerListResponseDto, SearchCoworkerListQueryParams, SearchCoworkerListResponseDto,
  SendInvitationResponseDto,
  UpdateCoworkerRequestDto,
  UpdateCoworkerResponseDto,
} from 'services/models/Coworkers';

const apiPath = "/coworkers";

class CoworkerService extends Service {
  @annotateNameAsync
  async fetchList(queryParams: FetchCoworkerListQueryParams): Promise<FetchCoworkerListResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchCoworkerListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchCoworkerListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async create(requestData: CreateCoworkerRequestDto) {
    try {
      return await httpClient.post<CreateCoworkerResponseDto | ServiceError>(
        apiPath,
        undefined,
        requestData,
        CreateCoworkerResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async update(id: string, requestData: UpdateCoworkerRequestDto) {
    try {
      return await httpClient.put<UpdateCoworkerResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        requestData,
        UpdateCoworkerResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async delete(id: string) {
    try {
      return await httpClient.delete<DeleteCoworkerResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        undefined,
        DeleteCoworkerResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async sendInvitation(id: string) {
    try {
      return await httpClient.post<SendInvitationResponseDto | ServiceError>(
        `${apiPath}/${id}/invite`,
        undefined,
        undefined,
        SendInvitationResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async search(queryParams: SearchCoworkerListQueryParams): Promise<SearchCoworkerListResponseDto | ServiceError> {
    try {
      return await httpClient.get<SearchCoworkerListResponseDto | ServiceError>(
        `${apiPath}/search`,
        queryParams,
        SearchCoworkerListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default CoworkerService;