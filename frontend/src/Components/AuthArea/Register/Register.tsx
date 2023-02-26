import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Utils/Notify";
import authService from "../../../Services/AuthService";
import "./Register.css";
import { ChangeEvent, SyntheticEvent, useEffect } from "react";
import AsideNavIcon from "../../../assets/Images/VacationImages/aside-icon.png";
import vacationService from "../../../Services/VacationService";
function Register(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserModel>();
  const navigate = useNavigate();

  useEffect(() => {
    // vacationService.getAllEmails()
    navigate("/register");
    let list = document.querySelectorAll(".list");
    list.forEach((item) => {
      item.classList.remove("active");
    });

    list[1].classList.add("active");
  }, []);

  async function send(user: UserModel) {
    try {
      const isEmailTaken = await vacationService.checkEmail(user.email);
      if (!isEmailTaken) {
        await authService.register(user);
        notify.success("Welcome " + user.firstName);
        let list = document.querySelectorAll(".list");
        list.forEach((item) => {
          item.classList.remove("active");
        });
        list[0].classList.add("active");

        navigate("/vacations");
      }
      else {
        alert("i am sorry but the email you have chosen is taken please try again..")
      }
    } catch (err: any) {
      notify.error("email is already taken!");
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
                    Sign Up
                    <br />
                    Now!
                  </h2>
                  <p>Ready to to be creative?</p>
                </div>
              </div>
            </div>
            <div className="content-form">
              <div className="y-style">
                <form onSubmit={handleSubmit(send)}>
                  <p>
                    <label>First Name</label>
                    <input
                      className="weird-border"
                      autoFocus
                      required
                      type="text"
                      placeholder="Enter your first name"
                      {...register("firstName")}
                      pattern="^[a-zA-Z]{2,20}$"
                    />
                  </p>
                  <p>
                    <label>last Name</label>
                    <input
                      className="weird-border"
                      type="text"
                      required
                      placeholder="Enter your last  name"
                      {...register("lastName")}
                     
                      pattern="^[a-zA-Z]{2,20}$"
                    
                    />
                  </p>
                  <p>
                    <label>Email</label>
                    <input
                      className="weird-border"
                      required
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
                      pattern="^.{4,}$"
                     
                    />
                  </p>

                  <p>
                    <Button variant="contained" type="submit">
                      Sign Up!
                    </Button>
                  </p>
                </form>
                <div className="afterform">
                  <NavLink className="link" to="/login">
                    <Button
                      className="t-signup"
                      sx={{
                        color: "green",
                      }}
                    >
                      Login
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

export default Register;
