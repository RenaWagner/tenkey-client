import { UserAction, UserState } from "./types";

const initialState: UserState = {
  loading: false,
  userInfo: [],
  token: "",
  styles: [],
};

export default function reducer(state = initialState, action: UserAction): any {
  switch (action.type) {
    case "user/loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "user/login": {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data,
        token: action.payload.token,
      };
    }
    case "user/logout": {
      return {
        ...state,
        loading: false,
        userInfo: [],
        token: "",
      };
    }
    case "user/updateProfile": {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.userToUpdate,
      };
    }
    case "user/allStyles": {
      return {
        ...state,
        loading: false,
        styles: [...action.payload],
      };
    }
    case "user/deleteStyle": {
      const styleId = action.payload;
      const updatedStyles = state.styles.filter((style) => {
        return style.id !== styleId;
      });
      return {
        ...state,
        loading: false,
        styles: [...updatedStyles],
      };
    }
    default: {
      return state;
    }
  }
}
