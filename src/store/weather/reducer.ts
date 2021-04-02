import { WeatherAction } from "./types";

const initialState: any = {
  loading: true,
  location: { lat: 0, lon: 0 },
  todayWeather: [],
  forecast: [],
};

export default function reducer(
  state = initialState,
  action: WeatherAction
): any {
  switch (action.type) {
    case "weather/fetch": {
      return {
        ...state,
        loading: false,
        location: { lat: action.payload[0].lat, lon: action.payload[0].lon },
        todayWeather: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
