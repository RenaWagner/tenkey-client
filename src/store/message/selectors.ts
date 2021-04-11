import { ReduxState } from "../index";

export const selectMessage = (reduxState: ReduxState) =>
  reduxState.message.message;
