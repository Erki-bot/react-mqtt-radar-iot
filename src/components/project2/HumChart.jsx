import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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
    <div id="chart">
      {datas && (
        <ReactApexChart
          options={{
            stroke: {
              curve: "smooth",
            },
            chart: {
              type: "area",
              stacked: false,
              height: 350,
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            title: {
              text: "Humidité",
              align: "left",
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
              },
            },
            yaxis: {
              // labels: {
              //   formatter: function (val) {
              //     return (val / 1000000).toFixed(0);
              //   },
              // },
              title: {
                text: "Humidité (%)",
              },
            },
            xaxis: {
              type: "datetime",
              categories: datas.categories,
            },
            tooltip: {
              shared: false,
              // y: {
              //   formatter: function (val) {
              //     return (val / 1000000).toFixed(0);
              //   },
              // },
            },
          }}
          series={datas.series}
          type="area"
          height={350}
        />
      )}
    </div>
  );
}
