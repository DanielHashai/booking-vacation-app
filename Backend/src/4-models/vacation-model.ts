import { UploadedFile } from "express-fileupload";

class VacationModel{

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageName: string;
    public image: UploadedFile
    public isFollowing: number
    public followersCount:number
    
    
    public constructor(vacation:VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;
    }



}
export default VacationModel;