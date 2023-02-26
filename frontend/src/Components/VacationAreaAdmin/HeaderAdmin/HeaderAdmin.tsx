import { useEffect, SyntheticEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import RouterAdmin from "../../LayoutArea/RouterAdmin/RouterAdmin";
import "./HeaderAdmin.css";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import authService from "../../../Services/AuthService";
import AsideNavIcon from "../../../assets/Images/VacationImages/aside-icon.png";

function HeaderAdmin(): JSX.Element {
  let list = document.querySelectorAll(".list");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${window.location.href.substring(22)}`);
    if (window.location.href.substring(22) === "vacations") {
      let list = document.querySelectorAll(".list");
      list[0].classList.add("active");
    }
  }, []);

  function activeLink(event: SyntheticEvent) {
    let list = document.querySelectorAll(".list");

    list.forEach((item) => {
      item.classList.remove("active");
      event.currentTarget.classList.add("active");
    });
  }

  function logout(): void {
    authService.logout();
  }

  return (
    <div className="Header">
      <div className="container-bg"></div>

      <div className="flex-header">
        <div className="navigation">
          <ul>
            <li onClick={activeLink} className="list active">
              <NavLink className="a" to="/vacations">
                <span className="icon">
                  {" "}
                  <HomeIcon />
                </span>
                <span className="text"> Home </span>
              </NavLink>
            </li>
            <li onClick={activeLink} className="list">
              <NavLink className="a" to="/register">
                <span className="icon">
                  <PersonAddAltIcon />
                </span>
                <span className="text"> Register </span>
              </NavLink>
            </li>

            <li onClick={activeLink} className="list">
              <NavLink className="a" to="/login">
                <span className="icon">
                  <LoginIcon />
                </span>
                <span className="text"> Login </span>
              </NavLink>
            </li>
            <li onClick={activeLink} className="list">
              <NavLink className="a" to="/login" onClick={logout}>
                <span className="icon">
                  <LogoutIcon />
                </span>
                <span className="text"> Logout </span>
              </NavLink>
            </li>
            {authService.isLoggedIn() && (
              <li onClick={activeLink} className="list">
                <NavLink className="a" to="/vacations/add">
                  <span className="icon">
                    <AddCircleOutlineIcon />
                  </span>
                  <span className="text"> Add </span>
                </NavLink>
              </li>
            )}

            <div className="indicator"></div>
          </ul>
        </div>
      </div>

      <nav className="aside-nav">
        <ul>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/vacations">
              <span className="logo aside-a">
                <img src={AsideNavIcon} alt="" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/vacations">
              <span className="aside-a">
                <i className="fas fa-home"></i>
                <span className="aside-nav-item">Home</span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/vacations/add">
              <span className="aside-a">
                <i className="fas fa-solid fa-plus"></i>
                <span className="aside-nav-item">Add Vacation </span>
              </span>
            </NavLink>
          </li>
          {!authService.isLoggedIn() && (
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <span className="aside-a">
                  <i className="fas fa-regular fa-pen-to-square"></i>
                  <span className="aside-nav-item">Login</span>
                </span>
              </NavLink>
            </li>
          )}

          


          {!authService.isLoggedIn() && (
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/register">
                <span className="aside-a">
                  <i className="fas fa-solid fa-users"></i>
                  <span className="aside-nav-item">Register</span>
                </span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink style={{ textDecoration: "none" }} to="/chart">
              <span className="aside-a">
                <i className="fas fa-solid fa-chart-simple"></i>
                <span className="aside-nav-item">Chart</span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/login"
              onClick={logout}
            >
              <span className="logout aside-a">
                <i className="fas fa-sign-out-alt"></i>
                <span className="aside-nav-item">Logout</span>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <RouterAdmin />
    </div>
  );
}

export default HeaderAdmin;
