import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function GasChart({ gasData }) {
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
            data: [...old.series[0].data, Number(gasData?.data) || 0],
          },
        ],
        categories: [...old.categories, new Date().toString()],
      };
    });
  }, [gasData]);
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
              text: "Courbe de CO2",
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
              min: 0,
              max: 100,
              title: {
                text: "Concentration en CO2",
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
