import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  FetchNetflowUserQuery,
  FetchNetflowUserResponse,
} from "../../types/types";

import * as netflowUtils from "../../apiutils/netflow.ts";
import { RootState } from "../store.ts";
import { logout } from "./auth.ts";

const name = "fetchNetflowUser";

const defaultQuery: FetchNetflowUserQuery = {
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
  data: null | FetchNetflowUserResponse;
  error: null | String;
  query: FetchNetflowUserQuery;
};

const initialValue: State = {
  success: false,
  loading: false,
  data: null,
  error: null,
  query: defaultQuery,
};

export const fetchNetflowThunk = createAsyncThunk<
  any,
  any,
  { state: RootState; rejectValue: { status: number; message: String } }
>(`${name}Thunk`, async ({}, ThunkAPI) => {
  const {
    fetchnetflowuser: {
      value: { query },
    },
    auth: {token}
  } = ThunkAPI.getState();

  if (token == null) {
    ThunkAPI.dispatch(logout());
    return;
  }

  try {
    const response = await netflowUtils.fetNetflowUsers(query, token);
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

export const fetchNetflowSlice = createSlice({
  name: `${name}`,
  initialState: { value: initialValue },
  reducers: {
    setFetchNetflowSliceState: (state, action): void => {
      state.value = action.payload;
    },
    setFetchNetflowSliceInitialState: (state): void => {
      state.value = initialValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNetflowThunk.fulfilled, (state, action) => {
      state.value.success = true;
      state.value.loading = false;
      state.value.data = action.payload;
      state.value.error = null;
    });
    builder.addCase(fetchNetflowThunk.pending, (state, _) => {
      state.value.success = false;
      state.value.loading = true;
      state.value.data = null;
      state.value.error = null;
    });
    builder.addCase(fetchNetflowThunk.rejected, (state, action) => {
      state.value.success = false;
      state.value.loading = false;
      state.value.data = null;
      state.value.error = action.payload?.message ?? null;
    });
  },
});

// const setFetchNetflowSliceAndDispatch  = (val: State) => (dispatch) => {
//   dispatch(setFetchNetflowSliceState(val));
//   dispatch(fetchNetflowThunk(null));
// };

export const { setFetchNetflowSliceState, setFetchNetflowSliceInitialState } = fetchNetflowSlice.actions;
export default fetchNetflowSlice.reducer;
