import "./UpdateVacation.css";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import notify from "../../../Utils/Notify";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import React from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import {
  DateRange,
  DateRangePicker,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import Box from "@mui/material/Box";
import vacationService from "../../../Services/VacationService";
import appConfig from "../../../Utils/AppConfig";

function getWeeksAfter(date: Dayjs | null, amount: number) {
  return date ? date.add(amount, "week") : undefined;
}
function UpdateVacation(this: any): JSX.Element {
  const [value, setValueTwo] = React.useState<DateRange<Dayjs>>([this, this]);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VacationModel>();
  const navigate = useNavigate();

  useEffect(() => {
    let list = document.querySelectorAll(".list");
    list.forEach((item) => {
      item.classList.remove("active");
    });

    list[1].classList.add("active");
  }, []);
  async function send(vacation: VacationModel) {
    try {
      if (vacation.startDate.length >= 10) {
        const dateOne = new Date(value[0].toDate());
        const dateTwo = new Date(value[1].toDate());
        const startDay = dateOne.toDateString().substring(8, 10);
        const startYear = dateOne.getFullYear();
        const startText = dateOne.toDateString().substring(4, 7);
        let startMonth = "";
        const endDay = dateTwo.toDateString().substring(8, 10);
        const endYear = dateTwo.getFullYear();
        const endText = dateTwo.toDateString().substring(4, 7);
        let endMonth = "";

        switch (startText) {
          case "Jan":
            startMonth = "01";
            break;
          case "Feb":
            startMonth = "02";
            break;
          case "Mar":
            startMonth = "03";
            break;

          case "Apr":
            startMonth = "04";
            break;

          case "May":
            startMonth = "05";
            break;
          case "Jun":
            startMonth = "06";
            break;
          case "Jul":
            startMonth = "07";
            break;
          case "Aug":
            startMonth = "08";

            break;
          case "Sep":
            startMonth = "09";
            break;
          case "Oct":
            startMonth = "10";
            break;
          case "Nov":
            startMonth = "11";
            break;
          case "Dec":
            startMonth = "12";
            break;
        }

        switch (endText) {
          case "Jan":
            endMonth = "01";
            break;
          case "Feb":
            endMonth = "02";
            break;
          case "Mar":
            endMonth = "03";
            break;

          case "Apr":
            endMonth = "04";
            break;
          case "May":
            endMonth = "05";
            break;
          case "Jun":
            endMonth = "06";
            break;
          case "Jul":
            endMonth = "07";
            break;
          case "Aug":
            endMonth = "08";

            break;
          case "Sep":
            endMonth = "09";
            break;
          case "Oct":
            endMonth = "10";
            break;
          case "Nov":
            endMonth = "11";
            break;
          case "Dec":
            endMonth = "12";
            break;
        }

        let startD = `${startYear}-${startMonth}-${startDay}`;
        let endD = `${endYear}-${endMonth}-${endDay}`;
        console.log(startD);
        console.log(endD);

        vacation.startDate = startD;
        vacation.endDate = endD;
      }

      vacation.image = (vacation.image as unknown as FileList)[0];

      // console.log("Arrived ad update!");

      // vacation.imageURL = appConfig.getImageURL+vacation.imageFile

      await vacationService.updateVacation(vacation);

      navigate("/vacations");
    } catch (err: any) {
      notify.error("email is already taken!");
    }
  }
  // ----------------------------------

  useEffect(() => {
    vacationService
      .getOneVacation(+params.id)
      .then((vacation) => {
        const tempDateStart = new Date(vacation.startDate.substring(0, 10));
        tempDateStart.setDate(tempDateStart.getDate() + 1);
        const tempDateEnd = new Date(vacation.endDate.substring(0, 10));
        tempDateEnd.setDate(tempDateEnd.getDate() + 1);
        const startDay = tempDateStart.toDateString().substring(8, 10);
        const startsYear = tempDateStart.getFullYear();
        const startText = tempDateStart.toDateString().substring(4, 7);
        let startMonth = "";
        const endDay = tempDateEnd.toDateString().substring(8, 10);
        const endYear = tempDateEnd.getFullYear();
        const endText = tempDateEnd.toDateString().substring(4, 7);
        let endMonth = "";

        switch (startText) {
          case "Jan":
            startMonth = "01";
            break;
          case "Feb":
            startMonth = "02";
            break;
          case "Mar":
            startMonth = "03";
            break;

          case "Apr":
            startMonth = "04";
            break;

          case "May":
            startMonth = "05";
            break;
          case "Jun":
            startMonth = "06";
            break;
          case "Jul":
            startMonth = "07";
            break;
          case "Aug":
            startMonth = "08";

            break;
          case "Sep":
            startMonth = "09";
            break;
          case "Oct":
            startMonth = "10";
            break;
          case "Nov":
            startMonth = "11";
            break;
          case "Dec":
            startMonth = "12";
            break;
        }

        switch (endText) {
          case "Jan":
            endMonth = "01";
            break;
          case "Feb":
            endMonth = "02";
            break;
          case "Mar":
            endMonth = "03";
            break;

          case "Apr":
            endMonth = "04";
            break;
          case "May":
            endMonth = "05";
            break;
          case "Jun":
            endMonth = "06";
            break;
          case "Jul":
            endMonth = "07";
            break;
          case "Aug":
            endMonth = "08";

            break;
          case "Sep":
            endMonth = "09";
            break;
          case "Oct":
            endMonth = "10";
            break;
          case "Nov":
            endMonth = "11";
            break;
          case "Dec":
            endMonth = "12";
            break;
        }

        let startD = `${startsYear}-${startMonth}-${startDay}`;
        let endD = `${endYear}-${endMonth}-${endDay}`;
        vacation.startDate = startD;
        vacation.endDate = endD;

        const startDate = vacation.startDate.substring(0, 10);
        const endDate = vacation.endDate.substring(0, 10);

        const startYear = vacation.startDate.substring(0, 4);
        dayjs(startDate);
        setValueTwo([dayjs(startD), dayjs(endD)]);
        setValue("destination", vacation.destination);
        setValue("description", vacation.description);
        setValue("imageFile", vacation.imageFile);
        setValue("startDate", startDate);
        setValue("endDate", endDate);
        setValue("price", vacation.price);
        setValue("vacationId", vacation.vacationId);

        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(image);
        } else {
          setPreview(appConfig.getImageURL + vacation.imageFile);
        }
      })
      .catch((err) => alert(err.message));
  }, [image]);

  return (
    <div id="page" className="site login-show">
      <div className="container">
        <div className="wrapper">
          <div className="login">
            <div className="content-heading">
              <div className="y-style">
                <div className="logo">
                  <a href="#">
                    <span>Admin</span>
                  </a>
                </div>
                <div className="welcome">
                  <h2>
                    Update
                    <br />
                    Vacation
                  </h2>
                </div>
              </div>
            </div>
            <div className="content-form">
              <div className="y-style">
                <form onSubmit={handleSubmit(send)}>
                  <label>Destination</label>
                  <p>
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="filled"
                      {...register("destination")}
                    />
                  </p>

                  <textarea
                    max="100"
                    min="5"
                    required
                    className="textarea"
                    placeholder="Description.."
                    {...register("description")}
                  ></textarea>
                  <p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateRangePicker
                        inputFormat="DD/MM/YYYY"
                        className="temp"
                        // disablePast
                        value={value}
                        maxDate={getWeeksAfter(value[0], 4)}
                        onChange={(newValue) => {
                          // console.log(newValue[0].);

                          setValueTwo(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                          <React.Fragment>
                            <TextField
                              {...startProps}
                              {...register("startDate")}
                            />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} {...register("endDate")} />
                          </React.Fragment>
                        )}
                      />
                    </LocalizationProvider>
                  </p>
                  <label>Price</label>
                  <p>
                    <TextField
                      {...register("price")}
                      type="number"
                      id="standard-basic"
                      label=""
                      variant="filled"
                    />
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={(event) => {
                      const file = event.target.files[0];

                      if (file && file.type.substring(0, 5) === "image") {
                        setImage(file);
                      } else {
                        setImage(null);
                      }
                    }}
                  />
                  <p>
                    <img className="image-preview" src={preview} />
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
                      Update
                    </Button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVacation;
