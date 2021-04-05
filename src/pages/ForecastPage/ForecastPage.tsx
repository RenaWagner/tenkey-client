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

type Props = {
  x: number;
  y: number;
  width: number;
  value: number;
};

export default function ForecastPage() {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);

  useEffect(() => {
    dispatch(fetchForecast(location));
  }, [dispatch]);

  const forecastData = useSelector(selectForecast);
  console.log(forecastData);

  const data = forecastData.map((data: WeatherForecast) => {
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
  console.log(data);

  return (
    <div>
      <p>Forecast Page</p>
      <ComposedChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="datetime" scale="band" xAxisId={0} />
        <XAxis
          dataKey="weather_desc"
          axisLine={false}
          tickLine={false}
          xAxisId={1}
        />
        <YAxis
          type="number"
          domain={["auto", "auto"]}
          yAxisId={0}
          label={{ value: "°C", position: "top" }}
        />
        <YAxis orientation="right" yAxisId={1} domain={[0, 20]} />
        <Tooltip />
        <Legend />
        <Bar
          name="Precipitation (mm)"
          dataKey="precip"
          barSize={20}
          fill="#413ea0"
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
          <LabelList dataKey="max_temp" position="top" />
        </Line>
        <Line
          name="Min Temp(°C)"
          dataKey="min_temp"
          stroke="#45b6fe"
          strokeWidth={2}
          yAxisId={0}
        >
          <LabelList dataKey="min_temp" position="top" />
        </Line>
      </ComposedChart>
    </div>
  );
}
