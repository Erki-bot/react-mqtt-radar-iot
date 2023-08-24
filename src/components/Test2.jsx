import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
function Test2({ radarDatas }) {
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
    <ReactApexChart
      options={{
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      }}
      series={[
        {
          name: "Desktops",
          data: Object.values(dataSet),
        },
      ]}
    />
  );
}

export default Test2;
