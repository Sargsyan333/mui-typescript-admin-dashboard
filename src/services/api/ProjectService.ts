import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { annotateNameAsync, ServiceError } from 'services/helperTypes';
import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  FetchProjectListQueryParams,
  FetchProjectListResponseDto,
  UpdateProjectRequestDto,
  UpdateProjectResponseDto,
  DeleteProjectResponseDto,
  SearchProjectListQueryParams,
  SearchProjectListResponseDto,
  PublishProjectResponseDto,
  UnpublishProjectResponseDto,
} from 'services/models/Projects';

const apiPath = "/projects";

class ProjectService extends Service {
  @annotateNameAsync
  async fetchList(queryParams: FetchProjectListQueryParams): Promise<FetchProjectListResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchProjectListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchProjectListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async create(requestData: CreateProjectRequestDto) {
    try {
      return await httpClient.post<CreateProjectResponseDto | ServiceError>(
        apiPath,
        undefined,
        requestData,
        CreateProjectResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async update(id: string, requestData: UpdateProjectRequestDto) {
    try {
      return await httpClient.put<UpdateProjectResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        requestData,
        UpdateProjectResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async delete(id: string) {
    try {
      return await httpClient.delete<DeleteProjectResponseDto | ServiceError>(
        `${apiPath}/${id}`,
        undefined,
        undefined,
        DeleteProjectResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async search(queryParams: SearchProjectListQueryParams): Promise<SearchProjectListResponseDto | ServiceError> {
    try {
      return await httpClient.get<SearchProjectListResponseDto | ServiceError>(
        `${apiPath}/search`,
        queryParams,
        SearchProjectListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async publish(id: string) {
    try {
      return await httpClient.patch<PublishProjectResponseDto | ServiceError>(
        `${apiPath}/${id}/publish`,
        undefined,
        undefined,
        PublishProjectResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async unpublish(id: string) {
    try {
      return await httpClient.patch<UnpublishProjectResponseDto | ServiceError>(
        `${apiPath}/${id}/unpublish`,
        undefined,
        undefined,
        UnpublishProjectResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default ProjectService;