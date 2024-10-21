import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { annotateNameAsync, ServiceError } from 'services/helperTypes';
import {
  CreateSubprojectRequestDto,
  CreateSubprojectResponseDto,
  DeleteSubprojectResponseDto,
  FetchSubprojectListQueryParams,
  FetchSubprojectListResponseDto,
  SearchSubprojectListQueryParams,
  SearchSubprojectListResponseDto,
  UpdateSubprojectRequestDto,
  UpdateSubprojectResponseDto,
} from 'services/models/Subprojects';

const apiPath = "/subprojects";

class SubprojectService extends Service {
  @annotateNameAsync
  async fetchList(queryParams: FetchSubprojectListQueryParams): Promise<FetchSubprojectListResponseDto | ServiceError> {
    if (!queryParams.project_id) {
      delete queryParams.project_id;
    }

    try {
      return await httpClient.get<FetchSubprojectListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchSubprojectListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async create(requestData: CreateSubprojectRequestDto) {
    try {
      return await httpClient.post<CreateSubprojectResponseDto | ServiceError>(
        apiPath,
        undefined,
        requestData,
        CreateSubprojectResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async update(id: string, requestData: UpdateSubprojectRequestDto) {
    try {
      return await httpClient.put<UpdateSubprojectResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        requestData,
        UpdateSubprojectResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async delete(id: string) {
    try {
      return await httpClient.delete<DeleteSubprojectResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        undefined,
        DeleteSubprojectResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async search(queryParams: SearchSubprojectListQueryParams): Promise<SearchSubprojectListResponseDto | ServiceError> {
    try {
      return await httpClient.get<SearchSubprojectListResponseDto | ServiceError>(
        `${apiPath}/search`,
        queryParams,
        SearchSubprojectListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default SubprojectService;