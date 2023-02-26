import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Vacations from "../../VacationArea/Vacations/Vacations";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Router.css";

function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/vacations" element={<Vacations />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default Router;
