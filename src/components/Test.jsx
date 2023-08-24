import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
function Test({ radarDatas }) {
  const [datas, setDatas] = useState({
    series: [{ name: "Distance", data: [0] }],
    categories: [0],
  });
  const [dataSet, setDataSet] = useState({ 0: 0 });

  useEffect(() => {
    let initValues = values(180);
    console.log(initValues);
    setDatas((old) => {
      const oldSeries = old?.series[0];
      return {
        series: [
          {
            ...oldSeries,
            data: initValues.ord,
          },
        ],
        categories: initValues.abs,
      };
    });
  }, []);

  useEffect(() => {
    if (radarDatas?.data && datas.series) {
      let oldSeries = {
        ...dataSet,
        [radarDatas.data.angle]: radarDatas.data.distance,
      };
      setDataSet(oldSeries);
      if (radarDatas.data.distance === 0) console.log(radarDatas.data.distance);
    }
  }, [radarDatas]);

  function values(points) {
    let abs = [];
    let ord = [];
    for (let i = 0; i < points; i++) {
      abs.push(i);
      ord.push(0);
    }
    return {
      abs,
      ord,
    };
  }

  // useEffect(() => {
  //   setDatas((old) => {
  //     return {
  //       series: [
  //         {
  //           name: old.series[0].name,
  //           data: [...old.series[0].data, Number(tempDatas?.data) || 0],
  //         },
  //       ],
  //       categories: [...old.categories, new Date().toString()],
  //     };
  //   });
  // }, [radarDatas]);
  return dataSet ? (
    <ReactApexChart
      options={{
        chart: {
          // height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "stepline",
        },
        xaxis: {
          type: "category",
          categories: Object.keys(dataSet),
          overwriteCategories: true,
        },
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm",
        //   },
        // },
        // series: { data: Object.values(dataSet) },
      }}
      series={[{ data: Object.values(dataSet) }]}
      // type="area"
      // height={350}
      // width={500}
    />
  ) : (
    <></>
  );
}

export default Test;
