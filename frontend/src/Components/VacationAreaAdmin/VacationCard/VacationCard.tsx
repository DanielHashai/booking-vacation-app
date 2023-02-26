import VacationModel from "../../../Models/VacationModel";
import { SyntheticEvent, useEffect, useState } from "react";
import vacationService from "../../../Services/VacationService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavLink } from "react-router-dom";
import "./VacationCard.css";

interface VacationProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationProps): JSX.Element {
  async function deleteVacation(e: SyntheticEvent): Promise<void> {
    const sure = window.confirm("Are you sure You want to DELETE?");
    if (!sure) return;
    vacationService
      .delete(props.vacation.vacationId)
      .then()
      .catch((err) => alert(err));
  }
  return (
    <div className="card-threeD">
      <div className="imgBx">
        <div className="card-buttons">
          <span className="garbage" onClick={deleteVacation}>
            <DeleteForeverIcon
              sx={{
                fontSize: "30px",
                cursor: "pointer",
              }}
              color="success"
            />
          </span>

          <NavLink to={"/update/" + props.vacation.vacationId}>
            <span className="edit-icon editer">
              <EditIcon
                color="secondary"
                sx={{
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              />
            </span>
          </NavLink>
        </div>
      </div>

      <div className="card-threeD-img">
        <img src={props.vacation.imageURL} />
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
                secondary={props.vacation.startDate}
              />
              <ListItemText
                sx={{
                  color: "black",
                }}
                primary="End Date"
                secondary={props.vacation.endDate}
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
                secondary={props.vacation.description}
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
                secondary={props.vacation.destination}
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
                secondary={props.vacation.price + " $"}
              />
            </ListItem>
            <Divider />
          </List>
        </div>
      </div>
    </div>
  );
}

export default VacationCard;
