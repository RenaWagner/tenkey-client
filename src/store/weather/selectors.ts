import { ReduxState } from "../index";

export const selectTodayWeather = (reduxState: ReduxState) =>
  reduxState.weather.todayWeather;

export const selectLocation = (reduxState: ReduxState) =>
  reduxState.weather.location;

export const selectForecast = (reduxState: ReduxState) =>
  reduxState.weather.forecast;

export const selectLoading = (reduxState: ReduxState) =>
  reduxState.weather.loading;

export const selectSpecificForecast = (date: string) => (
  reduxState: ReduxState
) => {
  const clonedForecast = [...reduxState.weather.forecast];
  const specificDateForecast = clonedForecast.filter((forecast) => {
    return forecast.datetime === date;
  });
  return specificDateForecast;
};
