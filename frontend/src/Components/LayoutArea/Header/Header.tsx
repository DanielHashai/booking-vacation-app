import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ReportIcon from "@mui/icons-material/Report";
import Router from "../Router/Router";
import authService from "../../../Services/AuthService";
import AsideNavIcon from "../../../assets/Images/VacationImages/aside-icon.png";

function Header(): JSX.Element {
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
            <li onClick={activeLink} className="list">
              <NavLink className="a" to="/vacations/add">
                <span className="icon">
                  <ReportIcon />
                </span>
                <span className="text"> Report </span>
              </NavLink>
            </li>

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

          {authService.isLoggedIn() && (
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/vacations">
                <span className="aside-a">
                  <i className="fas fa-home"></i>
                  <span className="aside-nav-item">Home</span>
                </span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink style={{ textDecoration: "none" }} to="/register">
              <span className="aside-a">
                <i className="fas fa-solid fa-users"></i>
                <span className="aside-nav-item">Register</span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/login">
              <span className="aside-a">
                <i className="fas fa-regular fa-pen-to-square"></i>
                <span className="aside-nav-item">Login</span>
              </span>
            </NavLink>
          </li>
          {authService.isLoggedIn() && (
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
          )}
        </ul>
      </nav>

      <Router />
    </div>
  );
}

export default Header;
