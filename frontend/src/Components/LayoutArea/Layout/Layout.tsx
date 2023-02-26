import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import HeaderAdmin from "../../VacationAreaAdmin/HeaderAdmin/HeaderAdmin";
import Header from "../Header/Header";

import "./Layout.css";

function Layout(): JSX.Element {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    if (
      authStore.getState().user &&
      authStore.getState().user.role === "Admin"
    ) {
      setIsAdmin(true);
      setIsUser(false);
    }
    if (
      authStore.getState().user &&
      authStore.getState().user.role === "User"
    ) {
      setIsUser(true);
      setIsAdmin(false);
    }
    authStore.subscribe(() => {
      if (
        authStore.getState().user &&
        authStore.getState().user.role === "Admin"
      ) {        
        setIsAdmin(true);
        setIsUser(false);
      }
      if (
        authStore.getState().user &&
        authStore.getState().user.role === "User"
      ) {
        setIsUser(true);
        setIsAdmin(false);
      }
      if (!authService.isLoggedIn()) {
        setIsGuest(true);
      } else {
        setIsGuest(false);
      }
    });
  }, [authStore]);

  return (
    <div className="Layout">
      {authService.isLoggedIn() && (
        <div className="wrapper-title">
          <div className="static-txt">Welcome Back</div>
          <ul className="dynamic-txts">
            <li>
              <span>{authStore.getState().user.firstName}</span>
            </li>
            <li>
              <span>{authStore.getState().user.lastName}</span>
            </li>
            <li>
              <span>{authStore.getState().user.firstName}</span>
            </li>
            <li>
              <span>{authStore.getState().user.lastName}</span>
            </li>
          </ul>
        </div>
      )}
      {!authService.isLoggedIn() && (
        <div className="wrapper-title">
          <div className="static-txt">Book Your'e next Dream</div>
          <ul className="dynamic-txts">
            <li>
              <span></span>
            </li>
            <li>
              <span>Vacation</span>
            </li>
            <li>
              <span> Here On</span>
            </li>
            <li>
              <span> Booking.com </span>
            </li>
          </ul>
        </div>
      )}

      <div className="circles">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {authService.isLoggedIn() && isAdmin ? <HeaderAdmin /> : <Header />}
    </div>
  );
}

export default Layout;
