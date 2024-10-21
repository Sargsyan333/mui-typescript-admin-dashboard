import { FetchPaginatedListQueryParams, QueryParams } from 'services/models/QueryParams';
import { SubprojectApiItem } from 'types/subprojects';

export class FetchSubprojectListQueryParams extends FetchPaginatedListQueryParams {
  project_id?: string;

  constructor(page: number, perPage: number, projectId?: string) {
    super(page, perPage);

    this.project_id = projectId;
  }
}

export class FetchSubprojectListResponseDto {
  items!: SubprojectApiItem[];

  total_count!: number;
}

export class CreateSubprojectRequestDto {
  code!: string;

  project_id!: string;

  coworker_id!: string;
}

export class CreateSubprojectResponseDto {}

export class UpdateSubprojectRequestDto {
  code!: string;

  project_id!: string;

  coworker_id!: string;
}

export class UpdateSubprojectResponseDto {}

export class DeleteSubprojectResponseDto {}

export class SearchSubprojectListQueryParams extends QueryParams {
  project_id!: string;

  constructor(projectId: string) {
    super();

    this.project_id = projectId;
  }
}

export class SearchSubprojectListResponseDto {
  items!: {name: string, value: string}[];
}