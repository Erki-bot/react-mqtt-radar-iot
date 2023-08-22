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

let mqttClient = new MQTTClient();
export function RadarChart() {
  const [data, setData] = useState();
  const [ti, setTi] = useState();
  useEffect(() => {
    let val = values(360);
    setData(val);
    mqttClient.connect(
      {
        host: "192.168.100.31",
        protocol: "ws",
        port: 8083,
        username: "Erki",
        password: "erki",
        clientId: `id_${parseInt(Math.random() * 1000)}`,
      },
      () => console.log("Connected to the broker"),
      () => console.log("Reconnecting to broker"),
      (error) => console.log(`Something failled ==> ${error.message}`)
    );

    mqttClient.subscribe("esp32/distance");
    mqttClient.onMessage((topic, payload) => {
      // payload = '{"name": "esp32"}'

      //   console.log(JSON.parse("{'name':'esp32'}"));
      //   console.log(payload.toString());
      let incomingDatas = JSON.parse(payload.toString());
      // console.log(incomingDatas);
      
        setData((old) => {
          let datas = old.datas;
          let angle = parseInt(incomingDatas.angle);
          angle < 90 ? (angle += 270) : (angle -= 90);
          datas[angle] = parseInt(incomingDatas.distance);
          return {
            labels: old.labels,
            datas,
          };
        });
    });
    return () => mqttClient.disconnect();
  }, []);
  function values(points) {
    let labels = [];
    let datas = [];
    for (let i = 0; i < points; i++) {
      labels.push(``);
      if (i > points / 4 && i < (3 * points) / 4) {
        datas.push(0);
      } else {
        datas.push(50);
      }
    }
    return {
      labels,
      datas,
    };
  }
  return data ? (
    <Radar
      data={{
        labels: data.labels,
        datasets: [
          {
            label: "# of Votes",
            data: data.datas,
            // backgroundColor: "#ffffff",
            backgroundColor: "rgba(255, 99, 132)",
            borderColor: "#ffffff",
            // borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      }}
    />
  ) : (
    <></>
  );
}
