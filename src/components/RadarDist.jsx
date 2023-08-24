import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./radar.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ffffff",
      },
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      color: "#ffffff",
    },
  },
};
export function RadarDist({ radarDatas }) {
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
  // useEffect(() => {
  //   let val = initialValues(0, 180);
  //   setData(val);
  // }, []);

  return dataSet ? (
    <Line
      // style={{ backgroundColor: "#0000ff" }}
      className="mt-5"
      options={{
        ...options,
        plugins: {
          customCanvaBackgroundColor: {
            color: "lightGreen",
          },
        },
      }}
      color="rgba(53, 162, 235)"
      data={{
        labels: Object.keys(dataSet),
        datasets: [
          {
            fill: {
              target: "origin",
              above: "rgba(255, 255, 255)",
              // below: "rgba(53, 162, 235)",
            },
            label: "Cartograhie",
            data: Object.values(dataSet),

            // borderColor: "rgb(53, 0, 235)",
            // backgroundColor: "rgba(53, 162, 235)",
          },
        ],
      }}
    />
  ) : (
    <></>
  );
}
