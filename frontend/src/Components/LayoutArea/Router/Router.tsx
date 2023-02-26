import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Vacations from "../../VacationArea/Vacations/Vacations";
import "./Router.css";

function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/vacations" />} />
      <Route path="/vacations" element={<Vacations />} />
    </Routes>
  );
}

export default Router;
