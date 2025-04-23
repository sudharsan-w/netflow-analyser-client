import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, validateToken } from "../../apiutils/login"
import { AxiosError } from 'axios';


type AuthState = {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  isAuthenticated: false,
};

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }, ThunkAPI) => {
    try {
      const response = await login({ username: credentials.username, password: credentials.password })
      return response.data
    } catch (e) {
      const err = e as AxiosError<any>;
      return ThunkAPI.rejectWithValue({
        status: err.response?.status ?? 500,
        message: err?.response?.data?.detail ?? "API Error",
      });
    }
  }
);

export const validateTokenThunk = createAsyncThunk(
  'auth/validateToken',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState() as { auth: AuthState };
    const token = state.auth.token;
    try {
      const response = await validateToken(token ?? "")
      return response.data
    } catch (e) {
      const err = e as AxiosError<any>;
      return ThunkAPI.rejectWithValue({
        status: err.response?.status ?? 500,
        message: err?.response?.data?.detail ?? "API Error",
      });
    }

  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(validateTokenThunk.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.valid;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
