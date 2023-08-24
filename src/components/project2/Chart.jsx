import ReactApexChart from "react-apexcharts";
import React from "react";

function Chart({ datas, yLabel, title }) {
  return (
    <div id="chart" className="my-5">
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
              id: "realtime",
              animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                  speed: 1000,
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            title: {
              text: title,
              align: "center",
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
                // text: "Concentration en gaz (%)",
                text: yLabel,
              },
            },
            xaxis: {
              type: "datetime",
              categories: datas.categories,
              range: "500000",
              title: {
                text: "Heure",
              },
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

export default Chart;
