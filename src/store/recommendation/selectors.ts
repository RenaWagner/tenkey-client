import { ReduxState } from "../index";
import { UserRatingPublicStyle, UserStyleData } from "./types";

export const selectPublicStyles = (reduxState: ReduxState) =>
  reduxState.recommendation.publicStyles;

export const selectUserStyles = (reduxState: ReduxState) =>
  reduxState.recommendation.userStyles;

export const selectPublicStylesWithRating = (reduxState: ReduxState) =>
  reduxState.recommendation.publicStylesRating;

export const selectStyleLoading = (reduxState: ReduxState) =>
  reduxState.recommendation.loading;

export const selectTypePublicStyles = (type: string) => (
  reduxState: ReduxState
) => {
  const clonedPublicStyles = [...reduxState.recommendation.publicStyles];
  if (type === "all") {
    return clonedPublicStyles;
  }
  const filteredPublicStyles = clonedPublicStyles.filter((style) => {
    return style.clothingType === type;
  });
  return filteredPublicStyles;
};

export const selectUserStyleWithId = (id: number) => (
  reduxState: ReduxState
) => {
  const clonedUserStyles: UserStyleData[] = [
    ...reduxState.recommendation.userStyles,
  ];
  const specificUserStyle = clonedUserStyles.find((style) => {
    return id === style.id;
  });
  return specificUserStyle;
};

export const selectPublicStyleWithId = (id: number) => (
  reduxState: ReduxState
) => {
  const clonedPublicStyles: UserRatingPublicStyle[] = [
    ...reduxState.recommendation.publicStylesRating,
  ];
  const specificPublicStyle = clonedPublicStyles.find((style) => {
    return id === style.id;
  });
  return specificPublicStyle;
};
