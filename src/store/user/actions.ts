import axios from "axios";
import { Dispatch } from "redux";
import { ReduxState } from "..";
import { UpdateProfile, UserData, UserInputData } from "./types";
const API_URL_STYLE = `https://tenkeyapp.herokuapp.com`;

export const login = (email: string, password: string, history: any) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(userLoading());
    try {
      const response = await axios.post(`${API_URL_STYLE}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      const { jwt } = response.data;
      history.push("/");
      localStorage.setItem("jwt", jwt);
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

export const signup = (data: UserInputData, history: any) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(userLoading());
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        type,
        sensitiveness,
      } = data;
      const response = await axios.post(`${API_URL_STYLE}/signup`, {
        firstName,
        lastName,
        email,
        password,
        clothingType: type,
        sensitiveness,
      });
      dispatch(loginSuccess(response.data));
      // const { jwt } = response.data;
      // localStorage.setItem("jwt", jwt);
      history.push("/");
      // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logout = (dispatch: Dispatch, getState: () => ReduxState) => {
  dispatch({ type: "user/logout" });
  // localStorage.removeItem("jwt");
};

export const bootstrapLoginState = () => async (
  dispatch: Dispatch,
  getState: () => ReduxState
) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    // const profile = await getProfile(jwt);
    // dispatch(userLoggedIn(jwt, profile));
  }
};

export const updateProfile = (data: UpdateProfile) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(userLoading());
    try {
      const { type, sensitiveness } = data;
      const jwt: string = getState().user.token;
      const response = await axios.patch(
        `${API_URL_STYLE}/user/profile`,
        {
          clothingType: type,
          sensitiveness: sensitiveness,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response.data);
      dispatch(updatedProfile(response.data));
      // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updatedProfile = (data: UserData) => ({
  type: "user/updateProfile",
  payload: data,
});
