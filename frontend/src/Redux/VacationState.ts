import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

export class VacationsState {
    public vacations: VacationModel[] = [];
    public page: number = 1;
    public onlyUserLikedVacations: boolean = false;
    public onlyVacationsThatDidNotStart: boolean = false;
    public onlyVacationStartedButEnded: boolean = false;
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState: VacationsState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;


            break;

        case VacationsActionType.AddVacation:

            action.payload.imageURL = appConfig.getImageURL + action.payload.imageName

console.log(action.payload);

            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:


            // action.payload.imageURL = appConfig.getImageURL + action.payload.imageName

            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);


            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;


            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;


    }

    return newState;

}
export const vacationsStore = createStore(vacationsReducer);
