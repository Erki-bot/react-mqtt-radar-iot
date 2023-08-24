import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
function Test({ radarDatas }) {
  const [datas, setDatas] = useState({
    series: [{ name: "Distance", data: [0] }],
    categories: [0],
  });
  // const [datas, setDatas] = useState();

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

    // setTimeout(() => {
    //   setDatas((old) => {
    //     const oldSeries = old?.series[0];
    //     let da = oldSeries.data;
    //     da[50] = 2;
    //     return {
    //       series: [
    //         {
    //           ...oldSeries,
    //           data: da,
    //         },
    //       ],
    //       categories: initValues.abs,
    //     };
    //   });
    //   console.log("Updated");
    // }, 3000);
  }, []);

  useEffect(() => {
    if (radarDatas?.data && datas.series) {
      setDatas((old) => {
        const oldSeries = old?.series[0];
        let data = oldSeries.data;
        let angle = Number(radarDatas.data.angle);

        data[angle] = Number(radarDatas.data.distance);
        return {
          series: [
            {
              ...oldSeries,
              data,
            },
          ],
          categories: old.categories,
        };
      });
    }
  }, [radarDatas]);

  // useEffect(() => {
  //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  //   console.log(datas);
  //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  // }, [datas]);
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
  return datas ? (
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
          // curve: "smooth",
        },
        xaxis: {
          type: "category",
          categories: datas.categories,
          overwriteCategories: true,
        },
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm",
        //   },
        // },
      }}
      series={datas.series}
      type="area"
      // height={350}
      // width={500}
    />
  ) : (
    <></>
  );
}

export default Test;
