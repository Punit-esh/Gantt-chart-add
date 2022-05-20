import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import close_img from "../img/close.png";
import edit_img from "../img/edit.png";
import { AddModal } from "./RelationalGanttChart/AddModal";
import { EditModal } from "./RelationalGanttChart/EditModal";
import { SideMenu } from "./RelationalGanttChart/SideMenu";

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

export const RelationalGanttChart = () => {
  const [relational_arr, setrelational_arr] = useState([]);
  const [rel_data_arr, setrel_data_arr] = useState([]);
  const [edit_modal, setedit_modal] = useState(false);
  const [edit_data, setedit_data] = useState("");
  console.log(relational_arr);
  const [add_modal, setadd_modal] = useState(false);

  useEffect(() => {
    setrelational_arr([]);
    let temp_arr = [];
    rel_data_arr.map((el) => {
      if (el[7] == "") return;
      el[7].split(",").map((el1) => {
        if (temp_arr.indexOf(el1) == -1) {
          temp_arr.push(el1);
        }
      });
    });
    setrelational_arr([...temp_arr]);
  }, [rel_data_arr]);

  useEffect(() => {
    if (
      localStorage.getItem("rel_data_arr") != null
      // || localStorage.getItem("rel_data_arr").length == 0
    ) {
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
      {/* <td>something</td> */}
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
      <SideMenu
        setadd_modal={setadd_modal}
        rel_data_arr={rel_data_arr}
        setrel_data_arr={setrel_data_arr}
      />
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

                {/* <td>{new Date(el[5]).toLocaleDateString}</td> */}
                <td>{el[6]}%</td>
                <td>{el[7]}</td>
                <td className="btn_main">
                  {relational_arr.indexOf(el[0]) > -1 ? (
                    <>
                      <div className="btn close_btn">
                        <div className="btn_toaster">
                          Other items are dependent on this
                        </div>
                        <img src={close_img} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="btn close_btn"
                        onClick={() => delete_rel_data_arr(i)}
                      >
                        <img src={close_img} />
                      </div>
                    </>
                  )}
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
          rel_data_arr={rel_data_arr}
          setrel_data_arr={setrel_data_arr}
          setadd_modal={setadd_modal}
        />
      )}
      {edit_modal && (
        <EditModal
          edit_data={edit_data}
          rel_data_arr={rel_data_arr}
          setrel_data_arr={setrel_data_arr}
          setedit_modal={setedit_modal}
        />
      )}
    </div>
  );
};
