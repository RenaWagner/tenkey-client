import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationInput from "../../components/LocationInput/LocationInput";
import { selectLocation } from "../../store/weather/selectors";
import { fetchForecast } from "../../store/weather/actions";

export default function ForecastPage() {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  console.log(location);

  useEffect(() => {
    dispatch(fetchForecast(location));
  }, [dispatch]);
  return <div></div>;
}
