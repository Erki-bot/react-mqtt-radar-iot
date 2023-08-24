import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import MQTTClient from "../mqtt/MQTTClient";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function RadarChart({ radarDatas }) {
  const [dataSet, setDataSet] = useState({ 0: 0 });

  useEffect(() => {
    if (radarDatas?.data) {
      let oldSeries = {
        ...dataSet,
        [radarDatas.data.angle]: radarDatas.data.distance,
      };
      setDataSet(oldSeries);
      if (radarDatas.data.distance === 0) console.log(radarDatas.data.distance);
    }
  }, [radarDatas]);
  return (
    <Radar
      data={{
        // labels: data.labels,
        datasets: [
          {
            label: "# of Votes",
            data: {
              labels: Object.keys(dataSet),
              values: Object.values(dataSet),
            },
            // backgroundColor: "#ffffff",
            backgroundColor: "rgba(255, 99, 132)",
            borderColor: "#ffffff",
            // borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}
