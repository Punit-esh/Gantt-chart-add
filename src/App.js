import logo from "./logo.svg";
import "./style/main.css";
import { Home } from "./Components/Home";
import { useRoutes } from "react-router";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const route = useRoutes(routes);
  return <>{route}</>;
}

export default App;
