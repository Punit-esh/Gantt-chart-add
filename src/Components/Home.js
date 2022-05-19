import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import close_img from "../img/close.png";
import { AddModal } from "./AddModal";
import { SideMenu } from "./SideMenu";

export const Home = () => {
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

  const [add_modal, setadd_modal] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("data_arr") != null ||
      localStorage.getItem("data_arr").length == 0
    ) {
      console.log("got local", JSON.parse(localStorage.getItem("data_arr")));
      let local_arr = JSON.parse(localStorage.getItem("data_arr"));
      setdata_arr([
        ...local_arr.map((el) => [
          el[0],
          el[1],
          el[2],
          new Date(el[3]),
          new Date(el[4]),
          el[5],
          el[6],
          el[7],
        ]),
      ]);
    }
  }, []);
  // useEffect(() => {
  //   localStorage.setItem("data_arr", JSON.stringify(data_arr));
  // }, [data_arr]);

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
  const delete_data_arr = (i) => {
    let copy_data_arr = [...data_arr];
    copy_data_arr.splice(i, 1);
    setdata_arr([...copy_data_arr]);
    localStorage.setItem("data_arr", JSON.stringify([...copy_data_arr]));
  };

  return (
    <div>
      <table id="gantt_table">
        {table_header()}
        {data_arr.length == 0 ? (
          <tr>
            <td colSpan="6">
              <div className="no_data">No data available</div>
            </td>
          </tr>
        ) : (
          data_arr.map((el, i) => {
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
                    <img src={close_img} onClick={() => delete_data_arr(i)} />
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </table>
      {data_arr.length == 0 ? (
        <></>
      ) : (
        <Chart
          chartType="Gantt"
          width="100%"
          height="50%"
          data={[columns, ...data_arr]}
          options={options}
        />
      )}
      {add_modal && (
        <AddModal
          data_arr={data_arr}
          setdata_arr={setdata_arr}
          setadd_modal={setadd_modal}
        />
      )}
      <SideMenu
        setadd_modal={setadd_modal}
        data_arr={data_arr}
        setdata_arr={setdata_arr}
      />
    </div>
  );
};
