import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { authStore } from "../../../Redux/AuthState";
import notify from "../../../Utils/Notify";
import authService from "../../../Services/AuthService";
import "./Login.css";
import { useEffect } from "react";
import AsideNavIcon from "../../../assets/Images/VacationImages/aside-icon.png";

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CredentialsModel>();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
    let list = document.querySelectorAll(".list");
    list.forEach((item) => {
      item.classList.remove("active");
    });
    list[2].classList.add("active");
  }, []);
  async function send(credentials: CredentialsModel): Promise<void> {
    try {
      // console.log("Arrived!");

      await authService.login(credentials);
      const token = authStore.getState();
      const user = token.user;

      // notify.success(`Welcome back! ${user.firstName} ${user.lastName}`);
      let list = document.querySelectorAll(".list");
      list.forEach((item) => {
        item.classList.remove("active");
      });
      list[0].classList.add("active");
      authStore.getState().justLoggedIn = true;
      navigate("/vacations");
    } catch (err) {
      notify.error("Invalid email or password please try again");
    }
  }
  return (
    <div id="page" className="site login-show">
      <div className="container">
        <div className="wrapper">
          <div className="login">
            <div className="content-heading">
              <div className="y-style">
                <div className="logo">
                  <img src={AsideNavIcon} alt="" />
                </div>
                <div className="welcome">
                  <h2>
                    Welcome
                    <br />
                    Back!
                  </h2>
                  <p>Get start to be creative</p>
                </div>
              </div>
            </div>
            <div className="content-form">
              <div className="y-style">
                <form onSubmit={handleSubmit(send)}>
                  <p>
                    <label>Email</label>
                    <input
                      className="weird-border"
                      required
                      autoFocus
                      type="text"
                      placeholder="Enter your email"
                      {...register("email")}
                      pattern="^(?!.*\.{2})(?!\.)[A-Za-z0-9_.'-]*[A-Za-z0-9_'-]@(?!_)(?:[a-z0-9_'-]+\.)+[a-z0-9_'-]{2,}$"
                    />
                  </p>
                  <p>
                    <label>Password</label>
                    <input
                      className="weird-border"
                      required
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      max="256"
                      min="4"
                    />
                  </p>
                  <p>
                    <Button
                      sx={{
                        marginTop: "10px",
                      }}
                      color="success"
                      type="submit"
                      variant="outlined"
                    >
                      Submit
                    </Button>
                  </p>
                </form>

                <div className="afterform">
                  <NavLink className="link" to="/register">
                    <Button
                      className="t-login"
                      sx={{
                        color: "green",
                      }}
                    >
                      Register
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
