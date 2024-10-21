import { FetchPaginatedListQueryParams, QueryParams } from 'services/models/QueryParams';
import { ProjectApiItem } from 'types/projects';

export class FetchProjectListQueryParams extends FetchPaginatedListQueryParams {}

export class FetchProjectListResponseDto {
  items!: ProjectApiItem[];

  total_count!: number;
}

export class CreateProjectRequestDto {
  name!: string;

  code!: string;

  client_id!: string;

  coworker_id!: string;
}

export class CreateProjectResponseDto {}

export class UpdateProjectRequestDto {
  name!: string;

  code!: string;

  client_id!: string;

  coworker_id!: string;
}

export class UpdateProjectResponseDto {}

export class DeleteProjectResponseDto {}

export class SearchProjectListQueryParams extends QueryParams {
  name!: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class SearchProjectListResponseDto {
  items!: {name: string, value: string}[];
}

export class PublishProjectResponseDto {}

export class UnpublishProjectResponseDto {}