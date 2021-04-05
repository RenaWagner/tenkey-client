import { WeatherAction } from "./types";

const initialState: any = {
  loading: false,
  location: { lattitude: 0, longtitude: 0 },
  todayWeather: [],
  forecast: [],
};

export default function reducer(
  state = initialState,
  action: WeatherAction
): any {
  switch (action.type) {
    case "weather/loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "weather/fetch": {
      return {
        ...state,
        loading: false,
        location: {
          lattitude: action.payload[0].lat,
          longtitude: action.payload[0].lon,
        },
        todayWeather: action.payload,
      };
    }
    case "weatherForecast/fetch": {
      return {
        ...state,
        loading: false,
        forecast: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
