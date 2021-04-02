import { ReduxState } from "../index";

export const selectTodayWeather = (reduxState: ReduxState) =>
  reduxState.weather.todayWeather;

export const selectLocation = (reduxState: ReduxState) =>
  reduxState.weather.location;
