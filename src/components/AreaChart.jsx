import React from "react";
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
import { faker } from "@faker-js/faker";
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
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: { type: "linear", min: 0, max: 10 },
    y: { type: "linear", min: 0, max: 10 },
  },
};
export default function AreaChart() {
  let coor = coordinates(10);

  const labels = coor.x;
  // const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: coor.y,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  function coordinates(radius) {
    let x = [];
    let y = [];
    for (let i = 0; i < radius; i++) {
      // x.push(radius * Math.cos((i * Math.PI) / 180));
      // y.push(radius * Math.sin((i * Math.PI) / 180));
      x.push(i);
      y.push(Math.sqrt(radius * radius - i * i));
    }
    return {
      x,
      y,
    };
  }

  return (
    // <div style={{ margin: "auto", width: 200 }}>
    <Line options={options} data={data} style={{ with: 25 }} />
    // </div>
  );
}
