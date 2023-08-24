import { useEffect, useState } from "react";
import Chart from "./Chart";

export default function GasChart({ gasData }) {
  const [datas, setDatas] = useState({
    series: [{ name: "Concentration en gaz", data: [0] }],
    categories: [new Date().toString()],
  });

  useEffect(() => {
    let time = new Date().toString();
    setDatas((old) => {
      return {
        series: [
          {
            name: old.series[0].name,
            data: [...old.series[0].data, Number(gasData?.data) || 0],
          },
        ],
        categories: [...old.categories, new Date().toString()],
      };
    });
  }, [gasData]);
  return (
    <Chart
      datas={datas}
      yLabel={"Concentration en gaz (%)"}
      title={"Courbe de gaz"}
    />
  );
}
