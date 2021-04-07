import { ReduxState } from "../index";

export const selectUser = (reduxState: ReduxState) => reduxState.user.userInfo;
export const selectUserToken = (reduxState: ReduxState) =>
  reduxState.user.token;
