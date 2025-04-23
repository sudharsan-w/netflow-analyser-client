import { AppTabs } from "../types/enums";

export const AppTabsMeta: {
  [key in AppTabs]: {
    displayName: String;
    route: String;
  };
} = {
  [AppTabs.FLOW_PAGE]: {
    displayName: "Flow Page",
    route: "/flows",
  },
  [AppTabs.USER_PAGE]: {
    displayName: "User Page",
    route: "/users",
  },
  [AppTabs.ANALYTICS]: {
    displayName: "Analytics",
    route: "/analytics",
  },
  [AppTabs.ALERTS]: {
    displayName: "Alerts",
    route: "/alerts",
  },
};

