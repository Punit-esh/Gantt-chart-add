import React, { useEffect, useState } from "react";
import close_img from "../../img/close.png";
import added from "../../img/check.png";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

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
    if (start_date == "") {
      setdate_err("set start date first");
      setend_date("");
    } else {
      setdate_err("set End date");
    }
  }, [start_date]);
  useEffect(() => {
    if (start_date != "" && end_date != "") {
      if (new Date(end_date) - new Date(start_date) < 0) {
        setdate_err("End Date cannot be before Start Date");
      } else {
        setdate_err("");
      }
    }
  }, [start_date, end_date]);
  useEffect(() => {
    if (
      name != "" &&
      start_date != "" &&
      end_date != "" &&
      percent != "" &&
      percent_err == "" &&
      date_err == ""
    ) {
      setsave(true);
    } else {
      setsave(false);
    }
  }, [name, start_date, end_date, percent, percent_err, date_err]);
  console.log(date_err);
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
            <Stack component="form" noValidate spacing={3}>
              <TextField
                id="date"
                type="date"
                sx={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={start_date}
                onChange={(newValue) => {
                  setstart_date(newValue.target.value);
                  if (end_date != "") {
                    setdate_err("set End Date");
                  }
                  setend_date("");
                }}
              />
            </Stack>
            {/* <input
              type="date"
              onChange={(e) => setstart_date(e.target.value)}
            /> */}
          </label>
          <label>
            End Date
            {date_err == "set start date first" ? (
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
                  {date_err}
                </div>
              </>
            ) : (
              <>
                <Stack component="form" noValidate spacing={3}>
                  <TextField
                    id="date1"
                    type="date"
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={end_date}
                    onChange={(newValue) => {
                      setend_date(newValue.target.value);
                    }}
                  />
                </Stack>
                <div className="error">{date_err}</div>
              </>
            )}
          </label>
          <label>
            Percentage Complete
            <input type="number" onChange={(e) => setpercent(e.target.value)} />
            <div show={`${percent_err ? "true" : "false"}`} className="error">
              {percent_err}
            </div>
          </label>
        </div>
        <div className="actions_btn">
          <div className="btn close_btn" onClick={() => setadd_modal(false)}>
            Cancel
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
                    Math.floor(Math.random() * 13),
                    // new Date().valueof(),
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
                      Math.floor(Math.random() * 13),
                      // new Date().valueof(),
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
              {/* <img src={added} /> */}
              ADD
            </div>
          ) : (
            <div className="btn close_btn save_btn disabled">
              {/* <img src={added} /> */}
              ADD
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
