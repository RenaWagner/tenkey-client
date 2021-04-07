import { RecommendationAction, RecommendationState } from "./types";

const initialState: RecommendationState = {
  loading: false,
  publicStyles: [],
  userStyles: [],
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
        publicStyles: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
