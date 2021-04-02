import axios from "axios";
import { Dispatch } from "redux";
import { ReduxState } from "..";
import { LongLatLocation, Weather } from "./types";
const API_URL = `http://api.weatherbit.io/v2.0`;
const API_KEY = "05b74c16ea7a4df39d05d7bc4cb2ddf8";

export const fetchWeatherLocation = (
  currentLocation: LongLatLocation
) => async (dispatch: Dispatch, getState: () => ReduxState) => {
  console.log(currentLocation);
  try {
    const res = await axios.get(
      `${API_URL}/current/?lat=${currentLocation.lattitude}&lon=${currentLocation.longtitude}&key=${API_KEY}`
    );
    console.log(res.data.data);
    dispatch(fetchedWeatherData(res.data.data));
  } catch (e) {
    console.log(e);
  }
};

export const fetchedWeatherData = (data: Weather[]) => ({
  type: "weather/fetch",
  payload: data,
});

export const fetchForecast = (currentLocation: LongLatLocation) => async (
  dispatch: Dispatch,
  getState: () => ReduxState
) => {
  try {
    const res = await axios.get(
      `${API_URL}/forecast/daily?lat=${currentLocation.lattitude}&lon=${currentLocation.longtitude}&key=${API_KEY}`
    );
    console.log(res.data.data);
    // dispatch(fetchedWeatherData(res.data.data));
  } catch (e) {
    console.log(e);
  }
};
