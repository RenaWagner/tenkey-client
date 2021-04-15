import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";
import { selectLoading } from "../../store/weather/selectors";
import StyleImage from "../../assets/StyleImage.jpeg";

export default function HomePage() {
  const isLoading = useSelector(selectLoading);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: 900 }}
    >
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: `url(${StyleImage})`,
          width: "100%",
          height: 900,
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
                Comfort Outfit
              </h1>
              <h2 className="mt-3 mb-5 pl-3 pr-3">
                Find the perfet outfit that matches the weather and temperature
              </h2>
              <div className="text-white">
                <LocationButton type="style" />
                <LocationInput type="style" />
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
  );
}
