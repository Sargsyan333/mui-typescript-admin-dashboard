import { FetchPaginatedListQueryParams, QueryParams } from 'services/models/QueryParams';
import { ClientApiItem } from 'types/clients';

export class FetchClientListQueryParams extends FetchPaginatedListQueryParams {}

export class FetchClientListResponseDto {
  items!: ClientApiItem[];

  total_count!: number;
}

export class CreateClientRequestDto {
  company_name!: string;
}

export class CreateClientResponseDto {}

export class DeleteClientResponseDto {}

export class UpdateClientRequestDto {
  company_name!: string;
}

export class UpdateClientResponseDto {}

export class SearchClientListQueryParams extends QueryParams {
  name!: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class SearchClientListResponseDto {
  items!: {name: string, value: string}[];
}