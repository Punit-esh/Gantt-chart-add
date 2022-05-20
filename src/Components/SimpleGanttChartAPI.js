import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const SimpleGanttChartAPI = () => {
  const [data_arr, setdata_arr] = useState([
    // [
    //   "2014Spring",
    //   "Spring 2014",
    //   `0`,
    //   new Date(2014, 2, 22),
    //   new Date(2014, 5, 20),
    //   null,
    //   100,
    //   null,
    // ],
  ]);

  useEffect(() => {
    let search_para = window.location.search.slice(1).split("=");
    if (search_para[0] == "id") {
      if (search_para[1] != "1234") {
        return;
      }
      setdata_arr([
        [
          1653017278818,
          "sdf",
          1,
          new Date("2022-05-08T00:00:00.000Z"),
          new Date("2022-05-28T00:00:00.000Z"),
          null,
          "12",
          null,
        ],
        [
          1653017287354,
          "safasf",
          2,
          new Date("2022-05-06T00:00:00.000Z"),
          new Date("2022-05-22T00:00:00.000Z"),
          null,
          "12",
          null,
        ],
        [
          1653017304234,
          "fasfaf",
          3,
          new Date("2022-05-05T00:00:00.000Z"),
          new Date("2022-05-28T00:00:00.000Z"),
          null,
          "23",
          null,
        ],
        [
          1653019036236,
          "sfdasa",
          5,
          new Date("2022-05-07T00:00:00.000Z"),
          new Date("2022-05-29T00:00:00.000Z"),
          null,
          "45",
          null,
        ],
      ]);
    }
  }, []);

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const options = {
    height: 40 + data_arr.length * 30,
    // width: window.innerWidth > 700 ? 1000 : window.innerWidth - 100,
    gantt: {
      trackHeight: 30,
    },
  };

  return (
    <div>
      {data_arr.length == 0 ? (
        <div>No Data Found</div>
      ) : (
        <div className="gantt_chart">
          <Chart
            chartType="Gantt"
            width="100%"
            height="50%"
            data={[columns, ...data_arr]}
            options={options}
          />
        </div>
      )}
    </div>
  );
};
