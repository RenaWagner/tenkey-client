import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectForecast, selectLocation } from "../../store/weather/selectors";
import { fetchForecast } from "../../store/weather/actions";
import { WeatherForecast } from "../../store/weather/types";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function XAxisWeather(props: any) {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <image
        xlinkHref={`https://www.weatherbit.io/static/img/icons/${props.payload.value}.png`}
        x={-25}
        y={0}
        height="50px"
        textAnchor="middle"
        fill="#666"
      />
    </g>
  );
}

function XAxisDate(props: any) {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <text dy={16} textAnchor="middle" fill="#666">
        {props.payload.value}
      </text>
    </g>
  );
}

export default function ForecastPage() {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);

  useEffect(() => {
    dispatch(fetchForecast(location));
  }, [dispatch]);

  const forecastData = useSelector(selectForecast);
  const forecastDataUsing =
    window.innerWidth < 450
      ? forecastData.slice(0, 5)
      : window.innerWidth < 860
      ? forecastData.slice(0, 7)
      : forecastData;

  const data = forecastDataUsing.map((data: WeatherForecast) => {
    const splitDate = data.datetime.split("-");
    const date = `${splitDate[1]}/${splitDate[2]}`;
    return {
      ...data,
      datetime: date,
      precip: Math.round(data.precip * 10) / 10,
      max_temp: Math.round(data.max_temp),
      min_temp: Math.round(data.min_temp),
      weather_code: data.weather.code,
      weather_icon: data.weather.icon,
      weather_desc: data.weather.description,
    };
  });

  return (
    <div className="mb-5">
      <h2 className="mt-5">Forecast</h2>
      <ResponsiveContainer width="100%" height={700}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="datetime"
            scale="band"
            xAxisId={0}
            tick={<XAxisDate />}
          />
          <XAxis
            dataKey="weather_icon"
            axisLine={false}
            tickLine={false}
            xAxisId={1}
            interval={0}
            tick={<XAxisWeather />}
          />
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            yAxisId={0}
            label={{
              value: "(°C)",
              position: "insideTopLeft",
            }}
            allowDecimals={false}
          ></YAxis>
          <YAxis
            orientation="right"
            yAxisId={1}
            domain={[0, 20]}
            label={{
              value: "(mm)",
              position: "insideTopRight",
            }}
            allowDecimals={false}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar
            name="Precipitation (mm)"
            dataKey="precip"
            barSize={20}
            fill="#add8e6"
            yAxisId={1}
          >
            <LabelList dataKey="precip" position="top" />
          </Bar>
          <Line
            name="Max Temp(°C)"
            dataKey="max_temp"
            stroke="#ff6600"
            strokeWidth={2}
            yAxisId={0}
          >
            <LabelList dataKey="max_temp" position="top" offset={15} />
          </Line>
          <Line
            name="Min Temp(°C)"
            dataKey="min_temp"
            stroke="#45b6fe"
            strokeWidth={2}
            yAxisId={0}
          >
            <LabelList dataKey="min_temp" position="top" offset={15} />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
