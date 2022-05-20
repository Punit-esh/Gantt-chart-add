import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import close_img from "../img/close.png";
import { AddModal } from "./RelationalGanttChart/AddModal";
import { SideMenu } from "./RelationalGanttChart/SideMenu";

export const RelationalGanttChart = () => {
  function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
  }
  const [rel_data_arr, setrel_data_arr] = useState([
    [
      "Research",
      "Find sources",
      "1",
      new Date(2015, 0, 1),
      new Date(2015, 0, 5),
      null,
      100,
      null,
    ],
    [
      "Write",
      "Write paper",
      "1",
      null,
      new Date(2015, 0, 9),
      daysToMilliseconds(3),
      25,
      "Research,Outline",
    ],
    [
      "Cite",
      "Create bibliography",
      "1",
      null,
      new Date(2015, 0, 7),
      daysToMilliseconds(1),
      20,
      "Research",
    ],
    [
      "Complete",
      "Hand in paper",
      "1",
      null,
      new Date(2015, 0, 10),
      daysToMilliseconds(1),
      0,
      "Cite,Write",
    ],
    [
      "Outline",
      "Outline paper",
      "1",
      null,
      new Date(2015, 0, 6),
      daysToMilliseconds(1),
      100,
      "Research",
    ],
  ]);

  const [add_modal, setadd_modal] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("rel_data_arr") != null
      // || localStorage.getItem("rel_data_arr").length == 0
    ) {
      console.log(
        "got local",
        JSON.parse(localStorage.getItem("rel_data_arr"))
      );
      let local_arr = JSON.parse(localStorage.getItem("rel_data_arr"));
      setrel_data_arr([
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
    height: 40 + rel_data_arr.length * 30,
    // width: window.innerWidth > 700 ? 1000 : window.innerWidth - 100,
    gantt: {
      trackHeight: 30,
    },
  };

  const table_header = () => (
    <tr className="table_heading">
      <td>Task ID</td>
      <td>Task Name</td>
      <td>Start Date</td>
      <td>End Date</td>
      <td>
        Percentage
        <br />
        Complete
      </td>
      <td>Dependencies</td>
      <td className="btn_main">Action</td>
    </tr>
  );
  const delete_rel_data_arr = (i) => {
    let copy_rel_data_arr = [...rel_data_arr];
    copy_rel_data_arr.splice(i, 1);
    setrel_data_arr([...copy_rel_data_arr]);
    localStorage.setItem(
      "rel_data_arr",
      JSON.stringify([...copy_rel_data_arr])
    );
  };

  return (
    <div>
      {rel_data_arr.length == 0 ? (
        <></>
      ) : (
        <div className="gantt_chart">
          <Chart
            chartType="Gantt"
            width="100%"
            height="50%"
            data={[columns, ...rel_data_arr]}
            options={options}
          />
        </div>
      )}
      <table id="gantt_table">
        {table_header()}
        {rel_data_arr.length == 0 ? (
          <tr>
            <td colSpan="6">
              <div className="no_data">No data available</div>
            </td>
          </tr>
        ) : (
          rel_data_arr.map((el, i) => {
            let temp_start_date = `
          ${new Date(el[3]).getDate()}
          /
          ${new Date(el[3]).getMonth() + 1}
          /
          ${new Date(el[3]).getFullYear()}`;
            let temp_end_date = `
          ${new Date(el[4]).getDate()}
          /
          ${new Date(el[4]).getMonth() + 1}
          /
          ${new Date(el[4]).getFullYear()}`;
            return (
              <tr key={i}>
                <td>{el[0]}</td>
                <td>{el[1]}</td>
                <td>{temp_start_date}</td>
                <td>{temp_end_date}</td>

                <td>{el[6]}%</td>
                <td>{el[7]}</td>
                <td className="btn_main">
                  <div
                    className="btn close_btn"
                    onClick={() => delete_rel_data_arr(i)}
                  >
                    <img src={close_img} />
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </table>
      {add_modal && (
        <AddModal
          rel_data_arr={rel_data_arr}
          setrel_data_arr={setrel_data_arr}
          setadd_modal={setadd_modal}
        />
      )}
      <SideMenu
        setadd_modal={setadd_modal}
        rel_data_arr={rel_data_arr}
        setrel_data_arr={setrel_data_arr}
      />
    </div>
  );
};
