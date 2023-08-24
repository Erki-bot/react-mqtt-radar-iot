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
import { faker } from "@faker-js/faker";
import MQTTClient from "../mqtt/MQTTClient";

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
};

let mqttClient = new MQTTClient();
export function RadarDist({radarDatas}) {
  const [data, setData] = useState();

  // useEffect(() => {
  //   let val = initialValues(0, 180);
  //   setData(val);
  // }, []);
  useEffect(() => {
    let val = initialValues(0, 180);
    setData(val);
    mqttClient.connect(
      {
        host: "192.168.100.31",
        protocol: "ws",
        port: 8083,
        username: "Erki",
        password: "erki",
        clientId: `id_${parseInt(`${Math.random() * 1000}`)}`,
      },
      () => console.log("Connected to the broker"),
      () => console.log("Reconnecting to broker"),
      (error) => console.log(`Something failled ==> ${error?.message}`)
    );

    mqttClient.subscribe("esp32/distance");
    mqttClient.onMessage((topic, payload) => {
      // payload = '{"name": "esp32"}'

      //   console.log(JSON.parse("{'name':'esp32'}"));
      //   console.log(payload.toString());
      let incomingDatas = JSON.parse(payload.toString());
      console.log(incomingDatas);

      // if (data) {
      setData((old) => {
        if (old) {
          let values = old.values;
          let angle = parseInt(incomingDatas.angle);
          // angle < 90 ? (angle += 270) : (angle -= 90);
          values[angle] = parseInt(incomingDatas.distance);
          return {
            labels: old.labels,
            values,
          };
        }
      });
      // }
    });
    return () => mqttClient.disconnect();
  }, []);
  return data ? (
    <Line
      options={options}
      data={{
        labels: data.labels,
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: data.values,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      }}
    />
  ) : (
    <></>
  );
}

function initialValues(min, max) {
  let labels = [];
  let values = [];
  for (let i = min; i <= max; i++) {
    labels.push(i);
    values.push(20);
  }
  return {
    labels,
    values,
  };
}
