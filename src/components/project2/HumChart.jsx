import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "./Chart";

export default function HumChart({ humDatas }) {
  const [datas, setDatas] = useState({
    series: [{ name: "Humidité", data: [0] }],
    categories: [new Date().toString()],
  });

  useEffect(() => {
    setDatas((old) => {
      return {
        series: [
          {
            name: old.series[0].name,
            data: [...old.series[0].data, Number(humDatas?.data) || 0],
          },
        ],
        categories: [...old.categories, new Date().toString()],
      };
    });
  }, [humDatas]);
  return (
    <Chart
      datas={datas}
      yLabel={"Humidité (%)"}
      title={"Courde de l'humidité"}
    />
  );
}
