export type MessageAction =
  | {
      type: "message/set";
      payload: SetMessage;
    }
  | {
      type: "message/clear";
    };

export type SetMessage = {
  variant: string;
  dismissable: boolean;
  text: string;
};

export type MessageState = {
  message: SetMessage;
};
