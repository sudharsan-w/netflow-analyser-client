import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { FetchFlowDistQuery } from "../../types/types";
import { FlowDistribution } from "../../types/schema.ts";

import * as netflowUtils from "../../apiutils/netflow.ts";
import { RootState } from "../store.ts";
import { logout } from "./auth.ts";

const name = "fetchFlowDist";

const defaultQuery: FetchFlowDistQuery = {
  body: { filters: {} },
  params: {
    search_key: null,
    flow_duration_lb: null,
    flow_duration_ub: null,
    date_from: null,
    date_to: null,
    sort_by: null,
    sort_order: "asc",
    granularity: "day"
  },
};

type State = {
  success: boolean;
  loading: boolean;
  data: null | FlowDistribution;
  error: null | String;
  query: FetchFlowDistQuery;
};

const initialValue: State = {
  success: false,
  loading: false,
  data: null,
  error: null,
  query: defaultQuery,
};

export const fetchFlowDistThunk = createAsyncThunk<
  any,
  any,
  { state: RootState; rejectValue: { status: number; message: String } }
>(`${name}Thunk`, async ({}, ThunkAPI) => {
  const {
    fetchflowdist: {
      value: { query },
    },
    auth: { token },
  } = ThunkAPI.getState();

  if (token == null) {
    ThunkAPI.dispatch(logout());
    return;
  }

  try {
    const response = await netflowUtils.fetFlowDist(query, token);
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

export const fetchFlowDistSlice = createSlice({
  name: `${name}`,
  initialState: { value: initialValue },
  reducers: {
    setFetchFlowDistSlice: (state, action): void => {
      state.value = action.payload;
    },
    setFetchFlowDistSliceInitialState: (state): void => {
      state.value = initialValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFlowDistThunk.fulfilled, (state, action) => {
      state.value.success = true;
      state.value.loading = false;
      state.value.data = action.payload;
      state.value.error = null;
    });
    builder.addCase(fetchFlowDistThunk.pending, (state, _) => {
      state.value.success = false;
      state.value.loading = true;
      state.value.data = null;
      state.value.error = null;
    });
    builder.addCase(fetchFlowDistThunk.rejected, (state, action) => {
      state.value.success = false;
      state.value.loading = false;
      state.value.data = null;
      state.value.error = action.payload?.message ?? null;
    });
  },
});

export const { setFetchFlowDistSlice, setFetchFlowDistSliceInitialState } =
  fetchFlowDistSlice.actions;
export default fetchFlowDistSlice.reducer;
