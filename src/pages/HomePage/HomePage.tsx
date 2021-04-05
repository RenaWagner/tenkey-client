import React from "react";
import WeatherToday from "../../components/WeatherToday/WeatherToday";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";

export default function HomePage() {
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 1000 }}
      >
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1601638037811-d824e56adc59?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")`,
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
                <h1 className="font-weight-bold" style={{ fontSize: 100 }}>
                  Comfort Style
                </h1>
                <h2 className="mb-5">
                  Find the perfet style that matches the weather and temperature
                </h2>
                <LocationButton />
                <LocationInput />
              </div>
            </div>
          </div>
        </div>
      </div>
      <WeatherToday />
    </div>
  );
}
