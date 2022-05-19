import React from "react";
import close_img from "../img/close.png";
import download from "../img/download.png";
import cleartable from "../img/cleartable.png";

export const SideMenu = ({ setadd_modal, data_arr, setdata_arr }) => {
  return (
    <>
      <div className="side_menu">
        <div
          cursor="pointer"
          className="arrow"
          onClick={(e) => e.target.parentNode.classList.toggle("active")}
        ></div>

        <a
          href={
            "data:text/plain;base64," +
            btoa(
              JSON.stringify(
                data_arr.length == 0 ? "no data available" : data_arr
              )
            )
          }
          download="GanttChart.txt"
          className="btn btn_right_menu menu1 download_txt"
        >
          <img src={download} />
          <span>.txt</span>
        </a>
        <a
          href={
            "data:text/plain;base64," +
            btoa(
              JSON.stringify(
                data_arr.length == 0 ? "no data available" : { data: data_arr }
              )
            )
          }
          download="GanttChart.json"
          className="btn btn_right_menu menu2 download_json"
        >
          <img src={download} />
          <span>.json</span>
        </a>
        <div className="btn btn_bottom_menu menu1 download_chart">
          <img src={download} />
          <span>chart</span>
        </div>
        <div
          className="btn btn_bottom_menu menu2 clear_all"
          onClick={() => {
            setdata_arr([]);
            localStorage.setItem("data_arr", JSON.stringify([]));
          }}
        >
          <img src={cleartable} />
        </div>
      </div>
      <div className="btn add_btn" onClick={() => setadd_modal(true)}>
        <img src={close_img} />
      </div>
    </>
  );
};
