import axios from "axios";

import { UserCredentials, LoginResponse, ValidationResponse } from "../types/types";

let API_URL = import.meta.env.VITE_API_URL;

export const login = async (creds: UserCredentials) => {
  return axios.post<LoginResponse>(`${API_URL}/login`, creds);
};

export const validateToken = async (token: string) => {
  return axios.get<ValidationResponse>(`${API_URL}/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
