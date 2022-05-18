let data_arr = [];

google.charts.load("current", { packages: ["gantt"] });
// google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Task ID");
  data.addColumn("string", "Task Name");
  // data.addColumn('string', 'Resource'); should be used for grouping things according to colors
  data.addColumn("date", "Start Date");
  data.addColumn("date", "End Date");
  data.addColumn("number", "Duration");
  data.addColumn("number", "Percent Complete");
  data.addColumn("string", "Dependencies");

  data.addRows(data_arr);

  var options = {
    height: 40 + data_arr.length * 30,
    gantt: {
      trackHeight: 30,
    },
  };

  var chart = new google.visualization.Gantt(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}

const table_header = `
<tr class="table_heading">
<td>Task ID</td>
<td>Task Name</td>
<td>Start Date</td>
<td>End Date</td>
<td>Percentage Complete</td>
<td class="btn_main">
    Action
    <!-- <div class="btn add_btn">Add</div> -->
    <!-- <div class="btn edit_btn">Edit</div> -->
</td>
</tr>
`;
const table_input = `
<tr class="table_input">
            <td>{id}</td>
            <td>
                <!-- <div>Task Name</div> -->
                <input type="text" id='task_name'>
            </td>
            <td>
                <!-- <div>Start Date</div> -->
                <input type="date" id='task_startdate'>
            </td>
            <td>
                <!-- <div>End Date</div> -->
                <input type="date" id='task_enddate'>
            </td>
            <td>
                <!-- <div>Percentage Complete</div> -->
                <input type="number" max="100" min="0" id='task_percent'>
            </td>
            <td class="btn_main">
                <div class="btn add_btn" onclick="add_datatoarr({id})">Add</div>
                <!-- <div class="btn edit_btn">Edit</div> -->
            </td>
        </tr>
`;
const table_show_data = () =>
  data_arr
    .map(
      (el) => `<tr class="">
    <td>${el[0]}</td>
    <td>${el[1]}</td>
    <td>${new Date(el[2]).toLocaleDateString()}</td>
    <td>${new Date(el[3]).toLocaleDateString()}</td>
    <td>${el[5]}%</td>
    <td class="btn_main">
        <div class="btn edit_btn">Edit</div>
    </td>
    </tr>`
    )
    .join("");
document.getElementById("gantt_table").innerHTML =
  table_header +
  table_show_data() +
  table_input.replaceAll("{id}", new Date().valueOf());

const add_datatoarr = (id) => {
  let data_to_add = [
    `${id}`,
    document.getElementById("task_name").value,
    document.getElementById("task_startdate").value,
    document.getElementById("task_enddate").value,
    null,
    document.getElementById("task_percent").value,
    null,
  ];
  console.log(data_arr, data_to_add);
  data_arr.push([
    data_to_add[0],
    data_to_add[1],
    new Date(data_to_add[2]),
    new Date(data_to_add[3]),
    data_to_add[4],
    Number(data_to_add[5]),
    data_to_add[6],
  ]);
  drawChart();

  document.getElementById("gantt_table").innerHTML =
    table_header +
    table_show_data() +
    table_input.replaceAll("{id}", new Date().valueOf());
};
