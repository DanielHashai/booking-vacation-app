class AppConfig {

    public loginURL = "http://localhost:4007/api/auth/login";
    public registerURL = "http://localhost:4007/api/auth/register";
    public vacationsURL = "http://localhost:4007/api/users/vacations";
    public userFollowURL = "http://localhost:4007/api/users/follow/";
    public userUnfollowURL = "http://localhost:4007/api/users/unfollow/"
    public vacationImagesPath = "http://localhost:4007/api/vacations/images/";
    public addVacationURL = "http://localhost:4007/api/admin/vacations/"
    public updateOneVacationURL = "http://localhost:4007/api/admin/vacations/update/"
    public getImageURL = "http://localhost:4007/api/vacations/images/"
    public deleteURL = "http://localhost:4007/api/admin/vacations/delete/"
    public getEmailsOfUsers = "http://localhost:4007/api/emails";
}
const appConfig = new AppConfig();
export default appConfig;