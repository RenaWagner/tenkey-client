import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";
import {
  selectTodayWeather,
  selectLoading,
} from "../../store/weather/selectors";
import {
  fetchPublicStyles,
  fetchUserStyle,
  fetchPublicStyleRating,
} from "../../store/recommendation/actions";
import StyleCard from "../../components/StyleCard/StyleCard";
import { selectUserToken } from "../../store/user/selectors";
import { Spinner } from "react-bootstrap";
import { showMessage } from "../../store/message/actions";

export default function StylePage() {
  const weatherData = useSelector(selectTodayWeather);
  const todayWeather = useSelector(selectTodayWeather);
  const isLoggedIn = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

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
            100000
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
        <div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 1000 }}
          >
            <div
              className="p-5 text-center bg-image"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80")`,
                width: "100%",
                height: 1000,
              }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div
                  className="mask p-5"
                  style={{ backgroundColor: `rgba(211,211,211, 0.6)` }}
                >
                  <div className="text-white">
                    <h2 className="mb-5">Choose the location first!</h2>
                    <LocationButton />
                    <LocationInput />
                  </div>
                  {isLoading ? (
                    <Spinner animation="border" role="status" className="mt-5">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
