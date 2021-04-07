import { ReduxState } from "../index";

export const selectPublicStyles = (reduxState: ReduxState) =>
  reduxState.recommendation.publicStyles;

export const selectUserStyles = (reduxState: ReduxState) =>
  reduxState.recommendation.userStyles;
