import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import StyleCard from "../../components/StyleCard/StyleCard";
import { showMessage } from "../../store/message/actions";
import {
  fetchPublicStyleRating,
  fetchPublicStyles,
  fetchUserStyle,
} from "../../store/recommendation/actions";
import { selectUserToken } from "../../store/user/selectors";
import { selectSpecificForecast } from "../../store/weather/selectors";

type Route = {
  date: "";
};

export default function ForecastStylePage() {
  const isLoggedIn = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const route_params: Route = useParams();
  const params = route_params.hasOwnProperty("date") ? route_params.date : "";
  const forecastWeather = useSelector(selectSpecificForecast(params));

  // console.log(forecastWeather);

  useEffect(() => {
    if (forecastWeather[0]) {
      const temp = Math.round(forecastWeather[0].app_max_temp);
      if (isLoggedIn !== "") {
        dispatch(fetchUserStyle(temp));
        dispatch(fetchPublicStyleRating(temp));
      } else {
        dispatch(fetchPublicStyles(temp));
      }
      if (forecastWeather[0].precip > 0) {
        dispatch(
          showMessage(
            "warning",
            false,
            "It might rain on this day! Don't forget an umbrella or rain jacket!",
            5000
          )
        );
      }
    }
    // eslint-disable-next-line
  }, [dispatch, isLoggedIn]);
  return (
    <div>
      {forecastWeather.length && route_params.hasOwnProperty("date") ? (
        <div>
          <h4 className="mt-3">
            Style recommendation in {forecastWeather[0].city_name} on{" "}
            {route_params.date}
          </h4>
          <StyleCard />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
