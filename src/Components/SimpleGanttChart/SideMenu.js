import React, { useEffect, useState } from "react";
import close_img from "../../img/close.png";
import download from "../../img/download.png";
import upload from "../../img/upload.png";
import cleartable from "../../img/cleartable.png";
import { handleBreakpoints } from "@mui/system";

export const SideMenu = ({ setadd_modal, data_arr, setdata_arr }) => {
  const [txtfile_err, settxtfile_err] = useState("");
  useEffect(() => {
    if (txtfile_err == "") {
      return;
    }
    const toast_id = `toast_${new Date().getMilliseconds()}`;
    const node = document.createElement("div");
    node.className = "toast";
    node.id = toast_id;
    let textnode = document.createTextNode(txtfile_err);
    node.appendChild(textnode);
    document.getElementById("toast_collector").appendChild(node);
    setTimeout(() => {
      document.getElementById(toast_id).remove();
    }, 3100);
  }, [txtfile_err]);

  const handleFileUpload = (current) => {
    if (current.files.length == 0) {
      return;
    }
    console.log(current.files);
    var fr = new FileReader();
    fr.onload = function () {
      let result = fr.result;
      try {
        let file_arr = JSON.parse(result);
        console.log(file_arr);
      } catch {
        settxtfile_err("File convertion error");
        return;
      }
      let file_arr = JSON.parse(result);
      console.log(file_arr);
      if (!Array.isArray(file_arr)) {
        return settxtfile_err("primary array error");
      }
      settxtfile_err("");
      let flag = false;
      for (let i in file_arr) {
        if (!Array.isArray(file_arr[i])) {
          settxtfile_err("seconday array error");
          break;
        }
        if (file_arr[i].length != 8) {
          settxtfile_err("secondary array length error");
          break;
        }
        if (
          typeof file_arr[i][0] != "number" ||
          typeof file_arr[i][1] != "string" ||
          new Date(file_arr[i][3]) == "Invalid Date" ||
          new Date(file_arr[i][4]) == "Invalid Date" ||
          file_arr[i][5] != null ||
          typeof file_arr[i][6] != "string" ||
          file_arr[i][7] != null
        ) {
          console.log([
            typeof file_arr[i][0] != "number",
            typeof file_arr[i][1] != "string",
            new Date(file_arr[i][3]) == "Invalid Date",
            new Date(file_arr[i][4]) == "Invalid Date",
            file_arr[i][5] != null,
            typeof file_arr[i][6] != "string",
            file_arr[i][7] != null,
          ]);
          settxtfile_err("secondary array type error");
          break;
        }
        console.log(i++);
        if (i++ == file_arr.length) {
          flag = true;
        }
      }
      if (flag) {
        let temp_arr = [
          ...JSON.parse(result).map((el) => [
            el[0],
            el[1],
            el[2],
            new Date(el[3]),
            new Date(el[4]),
            el[5],
            el[6],
            el[7],
          ]),
        ];
        setdata_arr(temp_arr);
        localStorage.setItem("data_arr", JSON.stringify(temp_arr));
      }
      console.log(flag);
    };
    // settxtfile_err("File uploaded doenot have the right data type error");

    fr.readAsText(current.files[0]);
    // console.log(current.parentNode.form.reset());
    // current.value = "";
  };
  return (
    <>
      <div className="side_menu active">
        {/* <div
          cursor="pointer"
          className="arrow"
          onClick={(e) => e.target.parentNode.classList.toggle("active")}
        ></div> */}
        <div
          className="btn btn_bottom_menu menu2 clear_all"
          onClick={() => {
            setdata_arr([]);
            localStorage.setItem("data_arr", JSON.stringify([]));
          }}
          data-disable={data_arr.length < 1 ? "yes" : "no"}
        >
          <img src={cleartable} />
        </div>
        <div
          className="btn btn_bottom_menu menu1 download_chart"
          onClick={() => window.print()}
          data-disable={data_arr.length < 1 ? "yes" : "no"}
        >
          <img src={download} />
          <span>chart</span>
        </div>
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
          data-disable={data_arr.length < 1 ? "yes" : "no"}
        >
          <img src={download} />
          <span>.txt</span>
        </a>
        <label
          className="btn btn_right_menu menu2 download_json"
          htmlFor="fileupload"
        >
          <img src={upload} />
          <span>.txt</span>
        </label>

        <div className="btn add_btn" onClick={() => setadd_modal(true)}>
          <img src={close_img} />
        </div>
      </div>
      <div className="txt_upload">
        <div className="heading">.txt upload</div>
        <form>
          <input
            id="fileupload"
            type="file"
            onChange={(e) => handleFileUpload(e.target)}
            accept=".txt"
          />
        </form>
      </div>
      <div className="toast_collector" id="toast_collector">
        {/* <div className="toast">a1</div>
        <div className="toast">a2</div>
        <div className="toast">a3</div>
        <div className="toast">a4</div>
        <div className="toast">a5</div>
        <div className="toast">a6</div>
        <div className="toast">a7</div>
        <div className="toast">a8</div>
        <div className="toast">a9</div>
        <div className="toast">a10</div>
        <div className="toast">a11</div>
        <div className="toast">a12</div> */}
      </div>
    </>
  );
};
