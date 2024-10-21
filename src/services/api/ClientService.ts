import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { annotateNameAsync, ServiceError } from 'services/helperTypes';
import {
  CreateClientRequestDto,
  CreateClientResponseDto,
  DeleteClientResponseDto,
  FetchClientListQueryParams,
  FetchClientListResponseDto,
  SearchClientListQueryParams,
  SearchClientListResponseDto,
  UpdateClientRequestDto,
  UpdateClientResponseDto,
} from 'services/models/Clients';

const apiPath = "/clients";

class ClientService extends Service {
  @annotateNameAsync
  async fetchList(queryParams: FetchClientListQueryParams): Promise<FetchClientListResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchClientListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchClientListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async create(requestData: CreateClientRequestDto) {
    try {
      return await httpClient.post<CreateClientResponseDto | ServiceError>(
        apiPath,
        undefined,
        requestData,
        CreateClientResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async update(id: string, requestData: UpdateClientRequestDto) {
    try {
      return await httpClient.put<UpdateClientResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        requestData,
        UpdateClientResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async delete(id: string) {
    try {
      return await httpClient.delete<DeleteClientResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        undefined,
        DeleteClientResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async search(queryParams: SearchClientListQueryParams): Promise<SearchClientListResponseDto | ServiceError> {
    try {
      return await httpClient.get<SearchClientListResponseDto | ServiceError>(
        `${apiPath}/search`,
        queryParams,
        SearchClientListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default ClientService;