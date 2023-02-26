import { Routes, Route, Navigate } from "react-router-dom";
import AddVacation from "../../AuthArea/AddVacation/AddVacation";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import UpdateVacation from "../../AuthArea/UpdateVacation/UpdateVacation";
import VacationChart from "../../VacationAreaAdmin/VacationChart/VacationChart";
import VacationsAdmin from "../../VacationAreaAdmin/VacationsAdmin/VacationsAdmin";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./RouterAdmin.css";

function RouterAdmin(): JSX.Element {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/vacations" />} />
      <Route path="/vacations" element={<VacationsAdmin />} />
      <Route path="/chart" element={<VacationChart />} />
      <Route path="/vacations/add" element={<AddVacation />} />
      <Route path="/update/:id" element={<UpdateVacation />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RouterAdmin;
