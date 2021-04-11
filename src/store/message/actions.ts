import { Dispatch } from "redux";
import { ReduxState } from "..";

export const showMessage = (
  variant: string,
  dismissable: boolean,
  text: string,
  timeout: number
) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(setMessage(variant, dismissable, text));
    const timeoutTiming = timeout || 1500;
    setTimeout(() => dispatch(clearMessage), timeoutTiming);
  };
};

export const setMessage = (
  variant: string,
  dismissable: boolean,
  text: string
) => ({
  type: "message/set",
  payload: { variant, dismissable, text },
});

export const clearMessage = {
  type: "message/clear",
};
