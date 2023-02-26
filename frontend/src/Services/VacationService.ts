import axios from "axios";
import EmailModel from "../Models/EmailModel";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
class VacationService {


    public async getAllVacations(): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0 || vacationsStore.getState().onlyUserLikedVacations || authStore.getState()) {
            const vacationContainer = await axios.get<VacationModel[]>(appConfig.vacationsURL);
            vacations = vacationContainer.data;
            vacations.map((vacation) => {
                const startYear = vacation.startDate.substring(0, 4);
                const startMonth = vacation.startDate.substring(5, 7);
                const startDay = vacation.startDate.substring(8, 10);
                const endYear = vacation.endDate.substring(0, 4);
                const endMonth = vacation.endDate.substring(5, 7);
                const endDay = vacation.endDate.substring(8, 10);
                vacation.startDate = startDay + "/" + startMonth + "/" + startYear;
                vacation.endDate = endDay + "/" + endMonth + "/" + endYear;

                vacation.imageURL = "http://localhost:4007/api/vacations/images/" + vacation.imageFile;
            })
            authStore.getState().justLoggedIn = false;
            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action);
        }
        const today = new Date();
        if (vacationsStore.getState().onlyVacationsThatDidNotStart) {
            vacations = vacations.filter((vacation) => {
                const startYear = vacation.startDate.substring(6, 11);
                const startMonth = vacation.startDate.substring(3, 5);
                const startDay = vacation.startDate.substring(0, 2);
                const startDate = new Date(+startYear, (+startMonth) - 1, +startDay);

                return startDate.getTime() > today.getTime()

            })

            vacationsStore.getState().onlyVacationsThatDidNotStart = false;
            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action);
        }
        if (vacationsStore.getState().onlyVacationStartedButEnded) {
            vacations = vacations.filter((vacation) => {

                const startYear = vacation.startDate.substring(6, 11);
                const startMonth = vacation.startDate.substring(3, 5);
                const startDay = vacation.startDate.substring(0, 2);
                const endYear = vacation.endDate.substring(6, 11);
                const endMonth = vacation.endDate.substring(3, 5);
                const endDay = vacation.endDate.substring(0, 2);
                const startDate = new Date(+startYear, (+startMonth) - 1, +startDay);

                const endDate = new Date(+endYear, (+endMonth) - 1, +endDay);
                if (endDate.getTime() >= today.getTime()) {
                    if (startDate.getTime() <= today.getTime()) {

                        return true;
                    }
                }
                else {
                    return false
                }

            })
            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action);
        }
        return vacations;
    }




    public async userFollowVacation(vacationId: number, imageUrl: string): Promise<void> {

        await axios.post<void>(appConfig.userFollowURL + vacationId);
        const vacation = vacationsStore.getState().vacations;
        const result = vacation.find((res) => res.vacationId === vacationId);
        result.isFollowing = 1;
        result.followersCount++;
        result.imageURL = imageUrl;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: result })
    }

    public async userUnfollowVacation(vacationId: number, imageUrl: string): Promise<void> {

        await axios.delete<void>(appConfig.userUnfollowURL + vacationId);

        const vacation = vacationsStore.getState().vacations;
        const result = vacation.find((res) => res.vacationId === vacationId);
        result.isFollowing = 0;
        result.followersCount--;

        result.imageURL = imageUrl;
        console.log(result.imageURL);

        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: result })

    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };


        const addedVacation = await axios.post<VacationModel>(appConfig.addVacationURL, vacation, { headers });
        const startYear = vacation.startDate.substring(0, 4);
        const startMonth = vacation.startDate.substring(5, 7);
        const startDay = vacation.startDate.substring(8, 10);
        const endYear = vacation.endDate.substring(0, 4);
        const endMonth = vacation.endDate.substring(5, 7);
        const endDay = vacation.endDate.substring(8, 10);


        addedVacation.data.startDate = startDay + "/" + startMonth + "/" + startYear;
        addedVacation.data.endDate = endDay + "/" + endMonth + "/" + endYear;

        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation.data })


    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const vacation = await axios.get<VacationModel>(appConfig.addVacationURL + vacationId);
        const result = vacation.data;

        return result;

    }
    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<VacationModel>(appConfig.updateOneVacationURL + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;


        vacation.imageURL = "http://localhost:4007/api/vacations/images/" + updatedVacation.imageName;
        vacation.imageFile = updatedVacation.imageName

        const startYear = vacation.startDate.substring(0, 4);
        const startMonth = vacation.startDate.substring(5, 7);
        const startDay = vacation.startDate.substring(8, 10);
        const endYear = vacation.endDate.substring(0, 4);
        const endMonth = vacation.endDate.substring(5, 7);
        const endDay = vacation.endDate.substring(8, 10);
        vacation.startDate = startDay + "/" + startMonth + "/" + startYear;
        vacation.endDate = endDay + "/" + endMonth + "/" + endYear;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: vacation });
    }

    public async delete(vacationId: number): Promise<void> {

        await axios.delete(appConfig.deleteURL + vacationId);
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });

    }

    public async checkEmail(email: string): Promise<boolean> {
        const emailsContainer = await axios.get<EmailModel[]>(appConfig.getEmailsOfUsers);
        const resultEmails = emailsContainer.data;
        const isEmailTaken = resultEmails.find((e) => {
            return e.email === email;
        })
        if (isEmailTaken) {
            return true;
        }
        else {
            return false
        }
    }

}


const vacationService = new VacationService();
export default vacationService;