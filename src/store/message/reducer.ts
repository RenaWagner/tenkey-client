import { MessageAction, MessageState } from "./types";
const initialState: MessageState = {
  message: {
    variant: "",
    dismissable: false,
    text: "",
  },
};

export default function reducer(
  state = initialState,
  action: MessageAction
): MessageState {
  switch (action.type) {
    case "message/set": {
      return {
        ...state,
        message: action.payload,
      };
    }
    case "message/clear": {
      return {
        ...state,
        message: {
          variant: "",
          dismissable: false,
          text: "",
        },
      };
    }
    default: {
      return state;
    }
  }
}
