import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import close_img from "../img/close.png";
import { AddModal } from "./AddModal";

export const Home = () => {
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

  const [data_arr, setdata_arr] = useState([
    // ..."1111111111111111111111111111111111111111"
    //   .split("")
    //   .map((el, i) =>
    [
      "2014Spring",
      "Spring 2014",
      `0`,
      new Date(2014, 2, 22),
      new Date(2014, 5, 20),
      null,
      100,
      null,
    ],
    //   ),
  ]);
  const [add_modal, setadd_modal] = useState(false);

  const data = [columns, ...data_arr];
  const options = {
    height: 40 + data_arr.length * 30,
    gantt: {
      trackHeight: 30,
    },
  };

  const table_header = () => (
    <tr class="table_heading">
      <td>Task ID</td>
      <td>Task Name</td>
      <td>Start Date</td>
      <td>End Date</td>
      <td>Percentage Complete</td>
      <td class="btn_main">Action</td>
    </tr>
  );
  //   const table_input = (id) => (
  //     <tr class="table_input">
  //       <td>{id}</td>
  //       <td>
  //         <input type="text" id="task_name" />
  //       </td>
  //       <td>
  //         <input type="date" id="task_startdate" />
  //       </td>
  //       <td>
  //         <input type="date" id="task_enddate" />
  //       </td>
  //       <td>
  //         <input type="number" max="100" min="0" id="task_percent" />
  //       </td>
  //       <td class="btn_main">
  //         <div class="btn add_btn" onclick={() => add_datatoarr(id)}>
  //           Add
  //         </div>
  //       </td>
  //     </tr>
  //   );

  //   const add_datatoarr = (id) => {
  //     let data_to_add = [
  //       `${id}`,
  //       document.getElementById("task_name").value,
  //       document.getElementById("task_startdate").value,
  //       document.getElementById("task_enddate").value,
  //       null,
  //       document.getElementById("task_percent").value,
  //       null,
  //     ];
  //     console.log(data_arr, data_to_add);
  //     data_arr.push([
  //       data_to_add[0],
  //       data_to_add[1],
  //       new Date(data_to_add[2]),
  //       new Date(data_to_add[3]),
  //       data_to_add[4],
  //       Number(data_to_add[5]),
  //       data_to_add[6],
  //     ]);

  return (
    <div>
      <table id="gantt_table">
        {table_header()}
        {data_arr.map((el) => {
          let temp_start_date = `
          ${new Date(el[3]).getDate()}
          /
          ${new Date(el[3]).getMonth()}
          /
          ${new Date(el[3]).getFullYear()}`;
          let temp_end_date = `
          ${new Date(el[4]).getDate()}
          /
          ${new Date(el[4]).getMonth()}
          /
          ${new Date(el[4]).getFullYear()}`;
          return (
            <tr class="">
              <td>{el[0]}</td>
              <td>{el[1]}</td>
              <td>{temp_start_date}</td>
              <td>{temp_end_date}</td>
              <td>{el[6]}%</td>
              <td class="btn_main">
                <div class="btn close_btn">
                  <img src={close_img} />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      <Chart
        chartType="Gantt"
        width="100%"
        height="50%"
        data={data}
        options={options}
      />
      <div className="btn add_btn" onClick={() => setadd_modal(true)}>
        <img src={close_img} />
      </div>
      {add_modal && (
        <AddModal
          data_arr={data_arr}
          setdata_arr={setdata_arr}
          setadd_modal={setadd_modal}
        />
      )}
    </div>
  );
};
