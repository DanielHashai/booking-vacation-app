class AppConfig {

    public port = 4007;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDataBase = "vacations_data_base";
    public vacationImagesPath = "http://localhost:4007/api/vacations/images/";
}
const appConfig = new AppConfig();
export default appConfig;