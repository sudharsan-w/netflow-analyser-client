import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  FetchNetflowAlertQuery,
  FetchNetflowAlertResponse,
} from "../../types/types";

import * as netflowUtils from "../../apiutils/netflow.ts";
import { RootState } from "../store.ts";
import { logout } from "./auth.ts";

const name = "fetchNetflowAlert";

const defaultQuery: FetchNetflowAlertQuery = {
  body: { filters: {} },
  params: {
    page: 1,
    limit: 10,
    search_key: null,
    date_from: null,
    date_to: null,
    sort_by: null,
    sort_order: "asc",
  },
};

type State = {
  success: boolean;
  loading: boolean;
  data: null | FetchNetflowAlertResponse;
  error: null | String;
  query: FetchNetflowAlertQuery;
};

const initialValue: State = {
  success: false,
  loading: false,
  data: null,
  error: null,
  query: defaultQuery,
};

export const fetchNetflowAlertThunk = createAsyncThunk<
  any,
  any,
  { state: RootState; rejectValue: { status: number; message: String } }
>(`${name}Thunk`, async ({}, ThunkAPI) => {
  const {
    fetchnetflowalert: {
      value: { query },
    },
    auth: { token },
  } = ThunkAPI.getState();

  if (token == null) {
    ThunkAPI.dispatch(logout());
    return;
  }

  try {
    const response = await netflowUtils.fetNetflowAlerts(query, token);
    return response.data;
  } catch (e) {
    const err = e as AxiosError<any>;
    if (err.response?.status == 403) {
      ThunkAPI.dispatch(logout());
    }
    return ThunkAPI.rejectWithValue({
      status: err.response?.status ?? 500,
      message: err?.response?.data?.detail ?? "API Error",
    });
  }
});

export const fetchNetflowAlertSlice = createSlice({
  name: `${name}`,
  initialState: { value: initialValue },
  reducers: {
    setFetchNetflowAlertSliceState: (state, action): void => {
      state.value = action.payload;
    },
    setFetchNetflowAlertSliceInitialState: (state): void => {
      state.value = initialValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNetflowAlertThunk.fulfilled, (state, action) => {
      state.value.success = true;
      state.value.loading = false;
      state.value.data = action.payload;
      state.value.error = null;
    });
    builder.addCase(fetchNetflowAlertThunk.pending, (state, _) => {
      state.value.success = false;
      state.value.loading = true;
      state.value.data = null;
      state.value.error = null;
    });
    builder.addCase(fetchNetflowAlertThunk.rejected, (state, action) => {
      state.value.success = false;
      state.value.loading = false;
      state.value.data = null;
      state.value.error = action.payload?.message ?? null;
    });
  },
});

export const {
  setFetchNetflowAlertSliceInitialState,
  setFetchNetflowAlertSliceState,
} = fetchNetflowAlertSlice.actions;
export default fetchNetflowAlertSlice.reducer;
