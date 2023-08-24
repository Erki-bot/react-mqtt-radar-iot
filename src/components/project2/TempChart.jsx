import { useEffect, useState } from "react";
import Chart from "./Chart";
export default function TempChart({ tempDatas }) {
  const [datas, setDatas] = useState({
    series: [{ name: "Température", data: [0] }],
    categories: [new Date().toString()],
  });

  useEffect(() => {
    let time = new Date().toString();
    setDatas((old) => {
      return {
        series: [
          {
            name: old.series[0].name,
            data: [...old.series[0].data, Number(tempDatas?.data) || 0],
          },
        ],
        categories: [...old.categories, new Date().toString()],
      };
    });
  }, [tempDatas]);
  return (
    <Chart
      datas={datas}
      yLabel={"Température (°C)"}
      title={"Courde de la température"}
    />
  );
}
