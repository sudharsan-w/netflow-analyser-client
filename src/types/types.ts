import * as schema from "./schema.ts";

export type SortOrder = "asc" | "desc";

export type Filters = {
  [key: string]: string[];
};

export type FetchNetflowQuery = {
  params: {
    page: number;
    limit: number;
    search_key: string | null;
    flow_duration_lb: number | null;
    flow_duration_ub: number | null;
    date_from: string | null;
    date_to: string | null;
    sort_by: string | null;
    sort_order: SortOrder;
  };
  body: {
    filters: Filters;
  };
};

export type FetchNetflowResponse = {
  page_no: number;
  skip: number;
  limit: number;
  pages_till: number;
  has_next_pages: boolean;
  has_prev_pages: boolean;
  data: Array<schema.NetflowRecord>;
};

export type FetchNetflowUserQuery = {
  params: {
    page: number;
    limit: number;
    search_key: string | null;
    date_from: string | null;
    date_to: string | null;
    sort_by: string | null;
    sort_order: SortOrder;
  };
  body: {
    filters: Filters;
  };
};

export type FetchNetflowUserResponse = {
  page_no: number;
  skip: number;
  limit: number;
  pages_till: number;
  has_next_pages: boolean;
  has_prev_pages: boolean;
  data: Array<schema.UserNetflow>;
};

export type Sort = {
  sortBy: String | null;
  sortOrder: SortOrder;
};

export type Pagination = {
  page_no: number;
  skip: number;
  limit: number;
  pages_till: number;
  has_next_pages: boolean;
  has_prev_pages: boolean;
};

export type UserCredentials = {
  username: string;
  password: string;
}

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
}

export type ValidationResponse = {
  valid: boolean
}