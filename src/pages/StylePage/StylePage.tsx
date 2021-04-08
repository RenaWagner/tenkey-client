import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";
import { selectTodayWeather } from "../../store/weather/selectors";
import { fetchPublicStyles } from "../../store/recommendation/actions";
import StyleCard from "../../components/StyleCard/StyleCard";

export default function StylePage() {
  const weatherData = useSelector(selectTodayWeather);
  const todayWeather = useSelector(selectTodayWeather);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  //   console.log(todayWeather);
  //TODO Spinner//
  useEffect(() => {
    if (todayWeather[0]) {
      const temp = Math.round(todayWeather[0].app_temp);
      dispatch(fetchPublicStyles(temp));
    }
  }, [dispatch, todayWeather]);

  return (
    <div>
      {weatherData.length ? (
        <div>
          <h4>Today's style recommendation in {todayWeather[0].city_name}</h4>

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
