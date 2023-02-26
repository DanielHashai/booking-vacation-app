import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";






async function getAllVacationsForUser(user: UserModel): Promise<VacationModel[]> {


    // const tempSQL = "SELECT startDate , endDate FROM vacations";
    const sql = `SELECT DISTINCT V.*,
     EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
     COUNT(F.userId) AS followersCount
     FROM vacations AS V LEFT JOIN followers AS F
     ON V.vacationId = F.vacationId
     GROUP BY vacationId
     ORDER BY startDate`;


    const vacations: VacationModel[] = await dal.execute(sql, user.userId);
    vacations.map((vacation) => {
        const newStartDate = new Date(vacation.startDate);
        newStartDate.setDate(newStartDate.getDate() + 1);
        const newEndDate = new Date(vacation.endDate);
        newEndDate.setDate(newEndDate.getDate() + 1);
        vacation.startDate = newStartDate
        vacation.endDate = newEndDate;
    })

    return vacations;
}

async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?,?)";
    await dal.execute(sql, userId, vacationId);
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);
}

// -------------------------------------------------------------------------------------


async function getAllVacationsForAdmin(): Promise<VacationModel[]> {


    const sql = `SELECT * FROM vacations ORDER BY startDate`;

    const vacations = await dal.execute(sql);

    return vacations;
}

async function getOneVacationForAdmin(vacationId: number): Promise<VacationModel> {


    const sql = `SELECT * FROM vacations WHERE vacationId = ?`;

    const vacationsContiainer = await dal.execute(sql, vacationId);
    const result = vacationsContiainer[0];

    return result;
}


async function addVacation(vacation: VacationModel): Promise<VacationModel> {


    vacation.imageName = await imageHandler.saveImage(vacation.image);

    console.log(vacation);
    const sql = "INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)";

    const vacationsContainer: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);


    delete vacation.image;
    vacation.vacationId = vacationsContainer.insertId;


    return vacation;
}






async function getImageNameFromDB(vacationId: number): Promise<string> {

    // Create sql query:
    const sql = "SELECT imageFile as imageName FROM vacations WHERE vacationId = ?";

    // Get object array:
    const vacationImageContainer = await dal.execute(sql, vacationId);

    // Extract single product: 
    const image = vacationImageContainer[0];

    // If no such product: 
    if (!image) return null;

    // Return image name:
    return image.imageName;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {


    // console.log(vacation.image);
    vacation.imageName = await getImageNameFromDB(vacation.vacationId);


    // Update existing image:
    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }

    console.log(vacation.imageName);
    const sql = "UPDATE vacations SET destination =? , description = ?,startDate = ? , endDate = ? , price = ? , imageFile = ?  WHERE vacationId = ?"

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    console.log(result);



    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Delete image property (which is the sent file object) from product object:
    delete vacation.image;

    return vacation
}


async function deleteProduct(vacationId: number): Promise<void> {

    // Get image name from database: 
    const imageName = await getImageNameFromDB(vacationId);

    // Delete that image from hard-disk: 
    imageHandler.deleteImage(imageName);

    // Create sql query: 
    const sql = `DELETE FROM vacations WHERE vacationId = ? `;

    // Execute query: 
    const result: OkPacket = await dal.execute(sql, vacationId);

    // If id not exists:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}


async function getAllEmailsFromDB(): Promise<string[]> {
    const sql = "SELECT email from users"
    const emails = await dal.execute(sql);
    // console.log(emails);
    return emails;
}
export default {
    getAllVacationsForUser,
    addVacation,
    getAllVacationsForAdmin,
    follow,
    unfollow,
    getImageNameFromDB,
    updateVacation,
    getOneVacationForAdmin,
    deleteProduct,
    getAllEmailsFromDB
}