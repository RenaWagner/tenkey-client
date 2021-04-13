import axios from "axios";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ReduxState } from "..";
import { setMessage, showMessage } from "../message/actions";
import {
  StyleData,
  StyleToUpdate,
  UploadData,
  UploadedData,
  UserRatingPublicStyle,
  UserStyleData,
} from "./types";
const API_URL_STYLE = `https://tenkeyapp.herokuapp.com`;

export const fetchPublicStyles = (temp: number) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch(recommendationLoading());
    try {
      const response = await axios.get(`${API_URL_STYLE}/public/${temp}`);
      dispatch(fetchedPublicStyles(response.data));
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
      dispatch(fetchedPublicStyleUserRating(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchedPublicStyleUserRating = (
  data: UserRatingPublicStyle[]
) => ({
  type: "recommendation/fetchedPubliStyleRating",
  payload: data,
});

export const updateRatingUserStyle = (
  id: number,
  rating: number | undefined
) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
    dispatch(recommendationLoading());
    try {
      const jwt: string = getState().user.token;
      console.log(jwt);
      const response = await axios.patch(
        `${API_URL_STYLE}/user/original/${id}`,
        {
          rating: rating,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response.data);
      dispatch(updatedUserSytle(response.data));
      dispatch(
        showMessage("success", false, "Successfully updated the rating!", 2000)
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

export const updatedUserSytle = (data: StyleToUpdate) => ({
  type: "recommendation/updatedUserSytle",
  payload: data,
});

export const updateCommentUserStyle = (
  id: number,
  comment: string | undefined
) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
    dispatch(recommendationLoading());
    try {
      const jwt: string = getState().user.token;
      const response = await axios.patch(
        `${API_URL_STYLE}/user/original/${id}`,
        {
          comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response.data);
      dispatch(updatedUserSytle(response.data));
      dispatch(
        showMessage("success", false, "Successfully updated the comment!", 2000)
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

export const updateRatingPublicStyle = (
  publicstyleId: number,
  rating: number | undefined
) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
    dispatch(recommendationLoading());
    try {
      const jwt: string = getState().user.token;
      const response = await axios.patch(
        `${API_URL_STYLE}/user/public/${publicstyleId}`,
        {
          rating: rating,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      dispatch(updatePublicStyle(response.data));
      dispatch(
        showMessage("success", false, "Successfully updated the rating!", 2000)
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

export const updatePublicStyle = (data: UserRatingPublicStyle) => ({
  type: "recommendation/updatePublicStyle",
  payload: data,
});

export const uploadStyle = (data: UploadData, imageUrl: string) => {
  return async (
    dispatch: ThunkDispatch<ReduxState, void, any>,
    getState: () => ReduxState
  ) => {
    dispatch(recommendationLoading());
    try {
      const { date, temperature, comment, rating } = data;
      const temp = parseInt(temperature);
      const jwt: string = getState().user.token;
      const response = await axios.post(
        `${API_URL_STYLE}/user/original`,
        {
          date: date,
          comment: comment,
          temp: temp,
          imageUrl: imageUrl,
          rating: rating,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response.data);
      dispatch(uploadedStyle(response.data));
      dispatch(
        showMessage("success", false, "Successfully uploaded your style!", 2000)
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

export const uploadedStyle = (data: UploadedData) => ({
  type: "recommendation/uploadedStyle",
  payload: data,
});
