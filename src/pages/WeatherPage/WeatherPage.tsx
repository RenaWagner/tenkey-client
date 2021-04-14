import React from "react";
import WeatherToday from "../../components/WeatherToday/WeatherToday";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";
import HomeImage from "../../assets/HomeImage.jpeg";

export default function WeatherPage() {
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 1000 }}
      >
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage: `url(${HomeImage})`,
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
                <h1
                  className="font-weight-bold pl-3 pr-3"
                  style={{ fontSize: 80 }}
                >
                  Today's Weather
                </h1>
                <h2 className="mt-3 mb-5 pl-3 pr-3">
                  Find the weather by location
                </h2>
                <LocationButton type="weather" />
                <LocationInput type="weather" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <WeatherToday />
    </div>
  );
}
