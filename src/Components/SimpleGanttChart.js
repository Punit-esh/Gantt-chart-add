import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import close_img from "../img/close.png";
import edit_img from "../img/edit.png";
import { AddModal } from "./SimpleGanttChart/AddModal";
import { EditModal } from "./SimpleGanttChart/EditModal";
import { SideMenu } from "./SimpleGanttChart/SideMenu";

export const SimpleGanttChart = () => {
  const [data_arr, setdata_arr] = useState([]);

  const [add_modal, setadd_modal] = useState(false);
  const [edit_modal, setedit_modal] = useState(false);
  const [edit_data, setedit_data] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data_arr") != null) {
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

  const table_header = () => (
    <tr className="table_heading">
      <td>Task ID</td>
      <td>Task Name</td>
      <td>Start Date</td>
      <td>End Date</td>
      <td>Percentage Complete</td>
      <td className="btn_main">Action</td>
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
      {data_arr.length == 0 ? (
        <></>
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
      <SideMenu
        setadd_modal={setadd_modal}
        data_arr={data_arr}
        setdata_arr={setdata_arr}
      />
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
                <td className="btn_main">
                  <div
                    className="btn close_btn"
                    onClick={() => delete_data_arr(i)}
                  >
                    <img src={close_img} />
                  </div>
                  <div
                    className="btn close_btn"
                    onClick={() => {
                      setedit_data(i);
                      setedit_modal(true);
                    }}
                  >
                    <img src={edit_img} />
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </table>
      {add_modal && (
        <AddModal
          data_arr={data_arr}
          setdata_arr={setdata_arr}
          setadd_modal={setadd_modal}
        />
      )}
      {edit_modal && (
        <EditModal
          edit_data={edit_data}
          data_arr={data_arr}
          setdata_arr={setdata_arr}
          setedit_modal={setedit_modal}
        />
      )}
    </div>
  );
};
