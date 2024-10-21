export class QueryParams {
  getParamsFromRequest(request: QueryParams = this): object {
    const entries = Object.entries(request);
    const params = new URLSearchParams();

    entries.forEach((pair) => {
      if (Array.isArray(pair[1])) {
        pair[1].forEach((nestedValue) => {
          params.append(pair[0], nestedValue);
        });
        return;
      }
      params.append(pair[0], pair[1]);
    });
    return params;
  }
}

export class FetchPaginatedListQueryParams extends QueryParams {
  page!: number;

  per_page!: number;

  constructor(page: number, perPage: number) {
    super();

    this.page = page;
    this.per_page = perPage;
  }
}
