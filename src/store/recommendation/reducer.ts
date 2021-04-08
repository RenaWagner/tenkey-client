import { RecommendationAction, RecommendationState } from "./types";

const initialState: RecommendationState = {
  loading: false,
  publicStyles: [],
  userStyles: [],
  publicStylesRating: [],
};

export default function reducer(
  state = initialState,
  action: RecommendationAction
): any {
  switch (action.type) {
    case "recommendation/loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "recommendation/fetchedPublicStyles": {
      return {
        ...state,
        loading: false,
        publicStyles: [...action.payload],
      };
    }
    case "recommendation/fetchedUserStyles": {
      return {
        ...state,
        loading: false,
        userStyles: [...action.payload],
      };
    }
    case "recommendation/fetchedPubliStyleRating": {
      return {
        ...state,
        loading: false,
        publicStylesRating: [...action.payload],
      };
    }
    case "recommendation/updateRatingUserSytle": {
      const updatedStyle = action.payload;
      const updatedItem = state.userStyles.map((style) => {
        if (style.id === updatedStyle.styleToUpdate.id) {
          return updatedStyle.styleToUpdate;
        } else {
          return style;
        }
      });
      return {
        ...state,
        userStyles: [...updatedItem],
      };
    }
    default: {
      return state;
    }
  }
}
