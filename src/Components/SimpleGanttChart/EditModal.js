import React, { useEffect, useState } from "react";
import close_img from "../../img/close.png";
import added from "../../img/check.png";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export const EditModal = ({
  edit_data,
  data_arr,
  setdata_arr,
  setedit_modal,
}) => {
  const [name, setname] = useState("");

  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [date_err, setdate_err] = useState("");

  const [percent, setpercent] = useState("");
  const [percent_err, setpercent_err] = useState("");

  const [save, setsave] = useState(false);

  useEffect(() => {
    let edit_start_date = new Date(data_arr[edit_data][3]);
    let edit_end_date = new Date(data_arr[edit_data][4]);
    // console.log(edit_end_date);
    setname(data_arr[edit_data][1]);
    setstart_date(
      `${edit_start_date.getFullYear()}-${
        edit_start_date.getMonth() < 9 ? "0" : ""
      }${edit_start_date.getMonth() + 1}-${
        edit_start_date.getDate() < 10 ? "0" : ""
      }${edit_start_date.getDate()}`
    );
    setTimeout(() => {
      setend_date(
        `${edit_end_date.getFullYear()}-${
          edit_end_date.getMonth() < 9 ? "0" : ""
        }${edit_end_date.getMonth() + 1}-${
          edit_end_date.getDate() < 10 ? "0" : ""
        }${edit_end_date.getDate()}`
      );
    }, 0);
    setpercent(data_arr[edit_data][6]);
  }, []);
  // console.log(end_date);

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
      if (
        data_arr[edit_data][1] != name ||
        data_arr[edit_data][3] - new Date(start_date) != 0 ||
        data_arr[edit_data][4] - new Date(end_date) != 0 ||
        data_arr[edit_data][6] != percent
      ) {
        // console.log([
        //   data_arr[edit_data][1] != name,
        //   data_arr[edit_data][3],
        //   start_date,
        //   data_arr[edit_data][4] - new Date(end_date),
        //   data_arr[edit_data][6] != percent,
        // ]);
        setsave(true);
      } else {
        setsave(false);
      }
    } else {
      setsave(false);
    }
  }, [name, start_date, end_date, percent, percent_err, date_err]);
  return (
    <div className="addmodal">
      <div className="modal_main">
        <div className="modal_header">Edit Data</div>
        <div className="modal_body">
          <label>
            Task Name
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
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
            <input
              value={percent}
              type="number"
              onChange={(e) => setpercent(e.target.value)}
            />
            <div show={`${percent_err ? "true" : "false"}`} className="error">
              {percent_err}
            </div>
          </label>
        </div>
        <div className="actions_btn">
          <div className="btn close_btn" onClick={() => setedit_modal(false)}>
            Cancel
          </div>
          {save ? (
            <div
              className="btn close_btn save_btn"
              onClick={() => {
                console.log(data_arr);
                let temp_edit_save_arr = [...data_arr];
                temp_edit_save_arr[edit_data] = [
                  data_arr[edit_data][0],
                  name,
                  data_arr[edit_data][2],
                  new Date(start_date),
                  new Date(end_date),
                  null,
                  percent,
                  null,
                ];
                setdata_arr([...temp_edit_save_arr]);
                localStorage.setItem(
                  "data_arr",
                  JSON.stringify([...temp_edit_save_arr])
                );
                // setedit_modal(false);
              }}
            >
              {/* <img src={added} /> */}
              Save
            </div>
          ) : (
            <div className="btn close_btn save_btn disabled">
              {/* <img src={added} /> */}
              SAVE
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
