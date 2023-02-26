import { SyntheticEvent, useEffect, useState } from "react";
import "./Vacations.css";
import vacationService from "../../../Services/VacationService";
import VacationModel from "../../../Models/VacationModel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import Pagination from "../Pagination/Pagination";
import notify from "../../../Utils/Notify";
import {
  VacationsActionType,
  vacationsStore,
} from "../../../Redux/VacationState";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";

function Vacations(): JSX.Element {
  const [vacations, setVacations] = React.useState<VacationModel[]>([]);

  // ------------------------------------------------------------------------------------

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);

  // getting current posts
  const indexOfLastPost = vacationsStore.getState().page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = vacationsStore
    .getState()
    .vacations.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    {
      vacationsStore.getState().page = pageNumber;
      const indexOfLastPost = vacationsStore.getState().page * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      setVacations(
        vacationsStore
          .getState()
          .vacations.slice(indexOfFirstPost, indexOfLastPost)
      );
      setCurrentPage(pageNumber);
    }
  };
  // ------------------------------------------------------------------------------------

  function dropdownItems(e: SyntheticEvent): void {
    console.log(e.currentTarget.classList.toggle("active"));
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    let index = +newValue;
    setCurrentPage(currentPage);
    const vacationId = vacations[index].vacationId;
    console.log(vacations[index].imageURL);

    if (vacations[index].isFollowing === 1) {
      vacationService
        .userUnfollowVacation(vacationId, vacations[index].imageURL)
        .then((res) => {
          notify.success(
            `You have unfollowed a vacation at destination: ${vacations[index].destination}`
          );
        })
        .catch((err) =>
          notify.error("Too many refresh or logins at the same time")
        );
    } else {
      vacationService
        .userFollowVacation(vacationId, vacations[index].imageURL)
        .then((res) =>
          notify.success(
            `You have followed a vacation at destination: ${vacations[index].destination}`
          )
        )
        .catch((err) =>
          notify.error("Too many refresh or logins at the same time")
        );
    }
  };
  useEffect(() => {
    vacationsStore.subscribe(() => {
      if (authStore.getState().token) {
        const indexOfLastPost = vacationsStore.getState().page * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;

        const currentPosts = vacationsStore
          .getState()
          .vacations.slice(indexOfFirstPost, indexOfLastPost);

        setVacations(currentPosts);
      }
    });

    authStore.subscribe(() => {
      if (!authStore.getState().user) {
        setVacations(null);
      }
    });
    if (authService.isLoggedIn()) {
      vacationService
        .getAllVacations()
        .then((res) => {
          setVacations(res);
        })
        .catch();
    }
  }, []);

  async function showUserLikedVacations(): Promise<void> {
    vacationsStore.getState().onlyUserLikedVacations = true;

    const likedVacations = await vacationService.getAllVacations();

    const getAllVacationsFromState = likedVacations.filter(
      (vacation) => vacation.isFollowing
    );
    vacationsStore.dispatch({
      type: VacationsActionType.FetchVacations,
      payload: getAllVacationsFromState,
    });
  }

  async function goBackToAllVacations(): Promise<void> {
    try {
      const getAllVacationsFromDB = await vacationService.getAllVacations();

      vacationsStore.dispatch({
        type: VacationsActionType.FetchVacations,
        payload: getAllVacationsFromDB,
      });
    } catch (err) {
      notify.error("Too many refresh or logins at the same time");
    }
  }
  async function showVacationsThatDidNotStart(): Promise<void> {
    console.log(showVacationsThatDidNotStart);

    vacationsStore.getState().onlyVacationsThatDidNotStart = true;
    const here = await vacationService.getAllVacations();
    vacationsStore.getState().onlyVacationsThatDidNotStart = false;
  }
  async function showAllVacationsThatStartedButNotEnded(): Promise<void> {
    try {
      vacationsStore.getState().onlyVacationStartedButEnded = true;

      const here = await vacationService.getAllVacations();
      console.log(here);
      if (vacations.length === 0) {
      }

      vacationsStore.getState().onlyVacationStartedButEnded = false;
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="Vacations">
      {authStore.getState().user && (
        <div className="container">
          {currentPosts &&
            currentPosts.map((vacation, index) => (
              <div className="container-threeD">
                <div className="card-threeD">
                  <div className="imgBx">
                    {vacation.isFollowing > 0 ? (
                      <span className="likeIcon">
                        <FavoriteIcon
                          sx={{
                            fontSize: "30px",
                          }}
                          color="error"
                        />
                      </span>
                    ) : (
                      <span className="likeIcon">
                        <FavoriteBorderIcon
                          color="error"
                          sx={{
                            fontSize: "30px",
                          }}
                        />
                      </span>
                    )}
                  </div>
                  <div className="card-threeD-img">
                    <img src={vacation.imageURL} />
                  </div>
                  <div className="card-threeD-body">
                    <span className="bg"></span>
                    <span className="bg"></span>
                    <span className="bg"></span>
                    <span className="bg"></span>
                    <div className="content">
                      <List
                        sx={{
                          width: "100%",
                          height: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                          overflow: "auto",
                        }}
                      >
                        <ListItem
                          sx={{
                            overflow: "auto",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <CalendarMonthIcon
                                sx={{
                                  fontSize: "30px",
                                }}
                              />
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            sx={{
                              color: "black",
                            }}
                            primary="Start Date"
                            secondary={vacation.startDate}
                          />
                          <ListItemText
                            sx={{
                              color: "black",
                            }}
                            primary="End Date"
                            secondary={vacation.endDate}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem
                          sx={{
                            height: "100px",
                            overflow: "auto",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <ImageSearchIcon />
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            sx={{
                              color: "black",
                            }}
                            primary="Details"
                            secondary={vacation.description}
                          />
                        </ListItem>
                        <Divider />

                        <ListItem
                          sx={{
                            overflow: "auto",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <BeachAccessIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            sx={{
                              color: "black",
                            }}
                            primary="Destination"
                            secondary={vacation.destination}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem
                          sx={{
                            overflow: "auto",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <MonetizationOnIcon />
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            sx={{
                              color: "black",
                            }}
                            primary="Price"
                            secondary={vacation.price + " $"}
                          />
                        </ListItem>
                        <Divider />

                        <BottomNavigation
                          showLabels
                          sx={{ width: "100%" }}
                          onChange={handleChange}
                        >
                          {vacation.followersCount > 0 ? (
                            <BottomNavigationAction
                              label={vacation.followersCount}
                              value={index}
                              icon={<FavoriteIcon color="primary" />}
                            />
                          ) : (
                            <BottomNavigationAction
                              label={vacation.followersCount}
                              value={index}
                              icon={<FavoriteIcon />}
                            />
                          )}
                        </BottomNavigation>
                      </List>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="design-for-pagination">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={vacationsStore.getState().vacations.length}
          paginate={paginate}
        />

        <div className="dropdown-box">
          <div onClick={dropdownItems} className="dropdown">
            Tools
            <span className="dropdown-left-icon"></span>
            <span className="dropdown-right-icon"></span>
            <div className="dropdown-items">
              <span onClick={goBackToAllVacations} className="dropdown-a one">
                <span></span> <i className="fa-solid fa-rotate-left"></i>
              </span>
              <span
                onClick={showUserLikedVacations}
                className="dropdown-a three"
              >
                <span></span> <i className="fa-regular fa-thumbs-up"></i>
              </span>
              <span
                onClick={showVacationsThatDidNotStart}
                className="dropdown-a two"
              >
                <span></span>Vacations Not started yet
              </span>
              <span
                onClick={showAllVacationsThatStartedButNotEnded}
                className="dropdown-a three"
              >
                <span></span> Vacations Started but not ended
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacations;
