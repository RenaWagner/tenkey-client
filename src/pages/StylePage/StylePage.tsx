import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodayWeather } from "../../store/weather/selectors";
import {
  fetchPublicStyles,
  fetchUserStyle,
  fetchPublicStyleRating,
} from "../../store/recommendation/actions";
import StyleCard from "../../components/StyleCard/StyleCard";
import { selectUserToken } from "../../store/user/selectors";
import { showMessage } from "../../store/message/actions";

export default function StylePage() {
  const weatherData = useSelector(selectTodayWeather);
  const todayWeather = useSelector(selectTodayWeather);
  const isLoggedIn = useSelector(selectUserToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todayWeather[0]) {
      const temp = Math.round(todayWeather[0].app_temp);
      if (isLoggedIn !== "") {
        dispatch(fetchUserStyle(temp));
        dispatch(fetchPublicStyleRating(temp));
      } else {
        dispatch(fetchPublicStyles(temp));
      }
      if (todayWeather[0].precip > 0) {
        dispatch(
          showMessage(
            "warning",
            false,
            "It might rain today! Don't forget an umbrella or rain jacket!",
            5000
          )
        );
      }
    }
  }, [dispatch, isLoggedIn, todayWeather]);

  return (
    <div>
      {weatherData.length ? (
        <div>
          <h4 className="mt-3">
            Today's style recommendation in {todayWeather[0].city_name}
          </h4>
          <StyleCard />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
