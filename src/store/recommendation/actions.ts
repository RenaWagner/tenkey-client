import axios from "axios";
import { Dispatch } from "redux";
import { ReduxState } from "..";
import { StyleData, UserStyleData } from "./types";
const API_URL_STYLE = `https://tenkeyapp.herokuapp.com`;

export const fetchPublicStyles = (temp: number) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(recommendationLoading());
    try {
      const response = await axios.get(`${API_URL_STYLE}/public/${temp}`);
      dispatch(fetchedPublicStyles(response.data));
      // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const recommendationLoading = () => ({
  type: "recommendation/loading",
});

export const fetchedPublicStyles = (data: StyleData[]) => ({
  type: "recommendation/fetchedPublicStyles",
  payload: data,
});

export const fetchUserStyle = (temp: number) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(recommendationLoading());
    try {
      const jwt: string = getState().user.token;
      const response = await axios.get(
        `${API_URL_STYLE}/user/original/${temp}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      dispatch(fetchedUserStyles(response.data));
      console.log(response.data);
      // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchedUserStyles = (data: UserStyleData[]) => ({
  type: "recommendation/fetchedUserStyles",
  payload: data,
});

export const fetchPublicStyleRating = (temp: number) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(recommendationLoading());
    try {
      const jwt: string = getState().user.token;
      const response = await axios.get(`${API_URL_STYLE}/user/public/${temp}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      //   dispatch(fetchedUserStyles(response.data));
      console.log(response.data);
      // dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      // dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};
