import logo from "./logo.svg";
import "./style/main.css";
import { useRoutes } from "react-router";
import { useNavigate } from "react-router-dom";
import { SimpleGanttChart } from "./Components/SimpleGanttChart";
import { RelationalGanttChart } from "./Components/RelationalGanttChart";

function App() {
  const navigate = useNavigate();
  const routes = [
    {
      path: "/",
      element: (
        <>
          <div onClick={() => navigate("/simple-gantt-chart")}>
            Simple Gantt chart
          </div>
          <div onClick={() => navigate("/relational-gantt-chart")}>
            Relational Gantt chart
          </div>
        </>
      ),
    },
    {
      path: "/simple-gantt-chart",
      element: <SimpleGanttChart />,
    },
    {
      path: "/relational-gantt-chart",
      element: <RelationalGanttChart />,
    },
  ];

  const route = useRoutes(routes);
  return <>{route}</>;
}

export default App;
