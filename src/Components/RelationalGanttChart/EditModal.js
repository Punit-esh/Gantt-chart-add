import React, { useEffect, useState } from "react";
import close_img from "../../img/close.png";
import added from "../../img/check.png";

// date-picker
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MultipleSelect from "../mui/MultiSelect_MUI";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditModal = ({
  rel_data_arr,
  edit_data,
  setrel_data_arr,
  setedit_modal,
}) => {
  const [name, setname] = useState("");

  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [date_err, setdate_err] = useState("");

  const [percent, setpercent] = useState("");
  const [percent_err, setpercent_err] = useState("");

  const [relations, setrelations] = useState([]);

  const [save, setsave] = useState(false);

  useEffect(() => {
    let edit_start_date = new Date(rel_data_arr[edit_data][3]);
    let edit_end_date = new Date(rel_data_arr[edit_data][4]);
    // console.log(edit_end_date);
    setname(rel_data_arr[edit_data][1]);
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
    setpercent(rel_data_arr[edit_data][6]);
    setrelations(rel_data_arr[edit_data][7].split(","));
    console.log(rel_data_arr[edit_data][6].split(","));
  }, []);

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
              type="number"
              value={percent}
              onChange={(e) => setpercent(e.target.value)}
            />
            <div show={`${percent_err ? "true" : "false"}`} className="error">
              {percent_err}
            </div>
          </label>
          {rel_data_arr.length != 0 ? (
            <label>
              Relation
              {date_err == "set start date first" ? (
                <>
                  <div
                    show="true"
                    className="error input"
                    id="startdate_not_filled"
                  >
                    {date_err}
                  </div>
                </>
              ) : (
                <MultipleSelect
                  names={[
                    ...rel_data_arr.filter((el) => {
                      console.log(new Date(el[3]) - new Date(start_date) < 0);
                      return new Date(el[3]) - new Date(start_date) < 0;
                    }),
                  ]}
                  relations={relations}
                  setrelations={setrelations}
                />
              )}
              {/* <input type="number" onChange={(e) => setpercent(e.target.value)} />
            <div show={`${percent_err ? "true" : "false"}`} className="error">
              {percent_err}
            </div> */}
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="actions_btn">
          <div className="btn close_btn" onClick={() => setedit_modal(false)}>
            Cancel
          </div>
          {save ? (
            <div
              className="btn close_btn save_btn"
              onClick={() => {
                setrel_data_arr([
                  ...rel_data_arr,
                  [
                    "id" + new Date().valueOf(),
                    name,
                    Math.floor(Math.random() * 13),
                    // new Date().valueof(),
                    new Date(start_date),
                    new Date(end_date),
                    null,
                    percent,
                    relations.join(","),
                  ],
                ]);
                localStorage.setItem(
                  "rel_data_arr",
                  JSON.stringify([
                    ...rel_data_arr,
                    [
                      "id" + new Date().valueOf(),
                      name,
                      Math.floor(Math.random() * 13),
                      // new Date().valueof(),
                      new Date(start_date),
                      new Date(end_date),
                      null,
                      percent,
                      relations.join(","),
                    ],
                  ])
                );
                setedit_modal(false);
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
