import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";
import { selectTodayWeather } from "../../store/weather/selectors";
import {
  fetchPublicStyles,
  fetchUserStyle,
  fetchPublicStyleRating,
} from "../../store/recommendation/actions";
import StyleCard from "../../components/StyleCard/StyleCard";
import { selectUserToken } from "../../store/user/selectors";

export default function StylePage() {
  const weatherData = useSelector(selectTodayWeather);
  const todayWeather = useSelector(selectTodayWeather);
  const isLoggedIn = useSelector(selectUserToken);
  const dispatch = useDispatch();

  //TODO Spinner//
  useEffect(() => {
    if (todayWeather[0]) {
      const temp = Math.round(todayWeather[0].app_temp);
      if (isLoggedIn !== "") {
        dispatch(fetchUserStyle(temp));
        dispatch(fetchPublicStyleRating(temp));
      } else {
        dispatch(fetchPublicStyles(temp));
      }
    }
  }, [dispatch, todayWeather, isLoggedIn]);

  return (
    <div>
      {weatherData.length ? (
        <div>
          <h2 className="mt-3">
            Today's style recommendation in {todayWeather[0].city_name}
          </h2>

          <StyleCard />
        </div>
      ) : (
        <div>
          <p>First, choose the location!</p>
          <LocationButton />
          <LocationInput />
        </div>
      )}
    </div>
  );
}
