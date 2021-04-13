import { ReduxState } from "../index";
import { UserUploadedStyles } from "./types";

export const selectUser = (reduxState: ReduxState) => reduxState.user.userInfo;
export const selectUserToken = (reduxState: ReduxState) =>
  reduxState.user.token;

export const selectUserAllStyles = (reduxState: ReduxState) =>
  reduxState.user.styles;

export const selectUserAllWithId = (id: number) => (reduxState: ReduxState) => {
  const clonedUserStyles: UserUploadedStyles[] = [...reduxState.user.styles];
  const specificUserStyle = clonedUserStyles.find((style) => {
    return id === style.id;
  });
  return specificUserStyle;
};
