import "./VacationsAdmin.css";
import { SyntheticEvent, useEffect, useState } from "react";
import vacationService from "../../../Services/VacationService";
import VacationModel from "../../../Models/VacationModel";
import React from "react";
import notify from "../../../Utils/Notify";
import {
  VacationsActionType,
  vacationsStore,
} from "../../../Redux/VacationState";
import Pagination from "../../VacationArea/Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import { authStore } from "../../../Redux/AuthState";
import CsvModel from "../../../Models/CsvModel";
import ReactCVS from "../ReactCVS/ReactCVS";

function VacationsAdmin(): JSX.Element {
  const [vacations, setVacations] = React.useState<VacationModel[]>([]);

  // ------------------------------------------------------------------------------------

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [data, setData] = useState<CsvModel[]>();
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
    e.currentTarget.classList.toggle("active");
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    let index = +newValue;
    setCurrentPage(currentPage);
    const vacationId = vacations[index].vacationId;

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
      const indexOfLastPost = vacationsStore.getState().page * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = vacationsStore
        .getState()
        .vacations.slice(indexOfFirstPost, indexOfLastPost);
      setVacations(currentPosts);
    });
    vacationService
      .getAllVacations()
      .then((res) => {
        const totalData = res.map((r) => {
          return {
            destination: r.destination,
            followers: r.followersCount,
          };
        });
        setData(totalData);
        setVacations(res);
      })
      .catch((err) => alert(err));

    authStore.subscribe(() => {
      if (!authStore.getState().user) {
        setVacations(null);
      }
    });
  }, []);

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
    vacationsStore.getState().onlyVacationsThatDidNotStart = true;
    await vacationService.getAllVacations();
    vacationsStore.getState().onlyVacationsThatDidNotStart = false;
  }
  async function showAllVacationsThatStartedButNotEnded(): Promise<void> {
    try {
      vacationsStore.getState().onlyVacationStartedButEnded = true;
      await vacationService.getAllVacations();

      vacationsStore.getState().onlyVacationStartedButEnded = false;
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="VacationsAdmin">
      {authStore.getState().user && (
        <div className="container">
          {currentPosts &&
            currentPosts.map((vacation, index) => (
              <VacationCard vacation={vacation} />
            ))}
        </div>
      )}

      <div className="design-for-pagination">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={vacationsStore.getState().vacations.length}
          paginate={paginate}
        />
      </div>
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
            <span
              onClick={showAllVacationsThatStartedButNotEnded}
              className="dropdown-a three"
            >
              <span></span> <ReactCVS data={data} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacationsAdmin;
