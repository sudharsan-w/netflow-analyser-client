import { configureStore } from "@reduxjs/toolkit";

import FetchNetflowReducer from "./features/fetchnetflow";
import FetchNetflowUserReducer from "./features/fetchnetflowuser";
import FetchNetflowAlertReducer from "./features/fetchnetflowalerts";
import FetchProtoDistribution from "./features/fetchprotodist";
import FetchFlowDistribution from "./features/fetchflowdist";
import AuthReducer from "./features/auth";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    fetchnetflow: FetchNetflowReducer,
    fetchnetflowuser: FetchNetflowUserReducer,
    fetchnetflowalert: FetchNetflowAlertReducer,
    fetchprotodist: FetchProtoDistribution,
    fetchflowdist: FetchFlowDistribution,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
