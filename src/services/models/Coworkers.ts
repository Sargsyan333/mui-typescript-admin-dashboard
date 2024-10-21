import { FetchPaginatedListQueryParams, QueryParams } from 'services/models/QueryParams';
import { CoworkerApiItem } from 'types/coworkers';

export class FetchCoworkerListQueryParams extends FetchPaginatedListQueryParams {}

export class FetchCoworkerListResponseDto {
  items!: CoworkerApiItem[];

  total_count!: number;
}

export class CreateCoworkerRequestDto {
  company_name!: string;

  email!: string;
}

export class CreateCoworkerResponseDto {}

export class DeleteCoworkerResponseDto {}

export class UpdateCoworkerRequestDto {
  company_name!: string;

  email!: string;
}

export class UpdateCoworkerResponseDto {}

export class SendInvitationResponseDto {}

export class SearchCoworkerListQueryParams extends QueryParams {
  name!: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class SearchCoworkerListResponseDto {
  items!: {name: string, value: string}[];
}