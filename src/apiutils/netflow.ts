import axios from "axios";

import {
  FetchNetflowQuery,
  FetchNetflowResponse,
  FetchNetflowUserQuery,
  FetchNetflowUserResponse,
} from "../types/types";

let API_URL = import.meta.env.VITE_API_URL;

export const fetNetflowRecords = async (
  query: FetchNetflowQuery,
  token: string
) => {
  console.log(query);
  return axios.post<FetchNetflowResponse>(
    `${API_URL}/v1/get/netflows`,
    query.body.filters,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: query.params,
    }
  );
};

export const fetNetflowUsers = async (
  query: FetchNetflowUserQuery,
  token: string
) => {
  return axios.post<FetchNetflowUserResponse>(
    `${API_URL}/v1/get/netflow_users`,
    query.body.filters,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: query.params,
    }
  );
};

export const fetchProtocolKeys = async (token: string) => {
  return axios.get<string[]>(`${API_URL}/v1/get/protocol/keys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSrcPortKeys = async (token: string) => {
  return axios.get<string[]>(`${API_URL}/v1/get/src_port/keys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchDstPortKeys = async (token: string) => {
  return axios.get<string[]>(`${API_URL}/v1/get/dst_port/keys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSrcCountryKeys = async (token: string) => {
  return axios.get<string[]>(`${API_URL}/v1/get/src_country/keys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchDstCountryKeys = async (token: string) => {
  return axios.get<string[]>(`${API_URL}/v1/get/dst_country/keys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
