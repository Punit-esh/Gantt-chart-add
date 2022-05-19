import React, { useEffect, useState } from "react";
import close_img from "../img/close.png";
import added from "../img/check.png";

export const AddModal = ({ data_arr, setdata_arr, setadd_modal }) => {
  const [name, setname] = useState("");

  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [date_err, setdate_err] = useState("");

  const [percent, setpercent] = useState("");
  const [percent_err, setpercent_err] = useState("");

  const [save, setsave] = useState(false);
  useEffect(() => {
    if (percent < 0 || percent > 100) {
      setpercent_err("percentage should be between 0 and 100");
    } else {
      setpercent_err("");
    }
  }, [percent]);
  useEffect(() => {
    setend_date("");
  }, [start_date]);
  useEffect(() => {
    if (
      name != "" &&
      start_date != "" &&
      end_date != "" &&
      percent != "" &&
      percent_err == ""
    ) {
      setsave(true);
    } else {
      setsave(false);
    }
  }, [name, start_date, end_date, percent, percent_err]);
  console.log(percent);
  return (
    <div className="addmodal">
      <div className="modal_main">
        <div className="modal_header">Add Data</div>
        <div className="modal_body">
          <label>
            Task Name
            <input type="text" onChange={(e) => setname(e.target.value)} />
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
                value={end_date}
                min={new Date(start_date).toISOString().split("T")[0]}
                onChange={(e) => setend_date(e.target.value)}
              />
            )}
          </label>
          <label>
            Percentage Complete
            <input type="text" onChange={(e) => setpercent(e.target.value)} />
            <div show={`${percent_err ? "true" : "false"}`} className="error">
              {percent_err}
            </div>
          </label>
        </div>
        <div className="actions_btn">
          <div className="btn close_btn" onClick={() => setadd_modal(false)}>
            <img src={close_img} />
          </div>
          {save ? (
            <div
              className="btn close_btn save_btn"
              onClick={() => {
                setdata_arr([
                  ...data_arr,
                  [
                    new Date().valueOf(),
                    name,
                    // Math.floor(Math.random() * 13),
                    new Date().valueof % 13,
                    new Date(start_date),
                    new Date(end_date),
                    null,
                    percent,
                    null,
                  ],
                ]);
                localStorage.setItem(
                  "data_arr",
                  JSON.stringify([
                    ...data_arr,
                    [
                      new Date().valueOf(),
                      name,
                      // Math.floor(Math.random() * 13),
                      new Date().valueof % 13,
                      new Date(start_date),
                      new Date(end_date),
                      null,
                      percent,
                      null,
                    ],
                  ])
                );
                setadd_modal(false);
              }}
            >
              <img src={added} />
            </div>
          ) : (
            <div className="btn close_btn save_btn disabled">
              <img src={added} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
