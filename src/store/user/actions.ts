import axios from "axios";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ReduxState } from "..";
import { setMessage, showMessage } from "../message/actions";
import { UpdateProfile, UserData, UserInputData } from "./types";
const API_URL_STYLE = `https://tenkeyapp.herokuapp.com`;

export const login = (email: string, password: string, history: any) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
    dispatch(userLoading());
    try {
      const response = await axios.post(`${API_URL_STYLE}/login`, {
        email,
        password,
      });

      const token = response.data.token;
      dispatch(loginSuccess(response.data, token));
      history.push("/");
      localStorage.setItem("jwt", token);
      dispatch(showMessage("success", false, "Welcome back!", 2000));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

export const userLoading = () => ({
  type: "user/loading",
});

export const loginSuccess = (data: UserData, token: string) => ({
  type: "user/login",
  payload: { data, token },
});

export const signup = (data: UserInputData, history: any) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
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
      const token = response.data.token;
      localStorage.setItem("jwt", token);
      dispatch(loginSuccess(response.data, token));

      history.push("/");
      dispatch(
        showMessage("success", false, "Successfully created an account!", 2000)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

export const logout = (dispatch: Dispatch, getState: () => ReduxState) => {
  dispatch({ type: "user/logout" });
  localStorage.removeItem("jwt");
};

export const bootstrapLoginState = () => async (
  dispatch: Dispatch,
  getState: () => ReduxState
) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    const profile = await getProfile(token);
    if (profile) {
      dispatch(loginSuccess(profile, token));
    }
  }
};

const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL_STYLE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (data: UpdateProfile) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
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
      dispatch(
        showMessage(
          "success",
          false,
          "Successfully updated your profile!",
          2000
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

export const updatedProfile = (data: UserData) => ({
  type: "user/updateProfile",
  payload: data,
});
