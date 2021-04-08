import { ReduxState } from "../index";

export const selectPublicStyles = (reduxState: ReduxState) =>
  reduxState.recommendation.publicStyles;

export const selectUserStyles = (reduxState: ReduxState) =>
  reduxState.recommendation.userStyles;

export const selectPublicStylesWithRating = (reduxState: ReduxState) =>
  reduxState.recommendation.publicStylesRating;

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
