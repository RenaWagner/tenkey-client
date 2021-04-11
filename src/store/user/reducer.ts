import { UserAction, UserState } from "./types";

const initialState: UserState = {
  loading: false,
  userInfo: [],
  token: "",
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
    default: {
      return state;
    }
  }
}
