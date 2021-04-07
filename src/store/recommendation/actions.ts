import axios from "axios";
import { Dispatch } from "redux";
import { ReduxState } from "..";
import { StyleData } from "./types";
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
