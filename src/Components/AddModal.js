import React, { useEffect, useState } from "react";
import close_img from "../img/close.png";
import added from "../img/check.png";

export const AddModal = ({ data_arr, setdata_arr, setadd_modal }) => {
  const [name, setname] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [percent, setpercent] = useState();
  const [percent_err, setpercent_err] = useState("");
  useEffect(() => {
    if (percent < 0 || percent > 100) {
      setpercent_err("percent should be between 0 and 100");
    } else {
      setpercent_err("");
    }
  }, [percent]);
  useEffect(() => {}, [name, start_date, end_date, percent, percent_err]);
  console.log(percent);
  return (
    <div className="addmodal">
      <div className="modal_main">
        <div className="modal_header">Add Data</div>
        <div className="modal_body">
          <label>
            Task Name
            <input type="text" />
          </label>
          <label>
            Start Date
            <input
              type="date"
              onChange={(e) => setstart_date(e.target.value)}
            />
          </label>
          <label>
            End Date
            {start_date == "" ? (
              <>
                {/* <input
                  type="date"
                  disabled
                  onClick={() => {
                    console.log(1);
                    document
                      .getElementById("startdate_not_filled")
                      .setAttribute("show", "true");
                  }}
                /> */}
                <div
                  show="true"
                  className="error input"
                  id="startdate_not_filled"
                >
                  select start date first
                </div>
              </>
            ) : (
              <input
                type="date"
                min={new Date(start_date).toISOString().split("T")[0]}
              />
            )}
          </label>
          <label>
            Percentage Complete
            <input type="text" onChange={(e) => setpercent(e.target.value)} />
            <div show={`${percent_err ? "true" : "false"}`} className="error">
              select start date first
            </div>
          </label>
        </div>
        <div className="actions_btn">
          <div className="btn close_btn" onClick={() => setadd_modal(false)}>
            <img src={close_img} />
          </div>
          <div className="btn close_btn disabled">
            <img src={added} />
          </div>
          <div
            className="btn close_btn"
            onClick={() => setdata_arr([...data_arr])}
          >
            <img src={added} />
          </div>
        </div>
      </div>
    </div>
  );
};
