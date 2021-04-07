import axios from "axios";
import { Dispatch } from "redux";
import { ReduxState } from "..";
import { UserData } from "./types";
const API_URL_STYLE = `https://tenkeyapp.herokuapp.com`;

export const login = (email: string, password: string, history: any) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(userLoading());
    try {
      const response = await axios.post(`${API_URL_STYLE}/login`, {
        email,
        password,
      });
      console.log(response.data);

      dispatch(loginSuccess(response.data));
      history.push("/");
      // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const userLoading = () => ({
  type: "user/loading",
});

export const loginSuccess = (data: UserData) => ({
  type: "user/login",
  payload: data,
});
