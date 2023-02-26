import express, { Request, Response, NextFunction, response } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";
import vacationService from "../5-services/vacations-service";


const router = express.Router();;


router.get("/users/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const user = cyber.getUserFromToken(request);
        const vacations = await vacationService.getAllVacationsForUser(user);
        console.log(vacations);
        
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }



})


router.get("/vacations/images/:imageName", (request: Request, response: Response, next: NextFunction) => {

    try {


        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName);
        response.sendFile(absolutePath);

    }
    catch (err) {
        next(err);
    }



});

router.post("/users/follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {

        console.log(+request.params.vacationId);
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await vacationService.follow(user.userId, vacationId);

        response.sendStatus(201);

    }
    catch (err) {
        next(err);
    }



})







router.delete("/users/unfollow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {

        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await vacationService.unfollow(user.userId, vacationId);
        response.sendStatus(204);

    }
    catch (err) {
        next(err);
    }



})

// -------------------------------------------------------------------------------------


router.get("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const vacations = await vacationService.getAllVacationsForAdmin();
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }


})

router.get("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {
        console.log("result");
        const vacationId = +request.params.vacationId;
        const vacations = await vacationService.getOneVacationForAdmin(vacationId);
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }


})



router.post("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

    try {


        request.body.image = request.files?.image;
        // console.log(request.body);
        const vacation = new VacationModel(request.body);
        const vacationAdded = await vacationService.addVacation(vacation);
        // console.log(vacationAdded);

        response.status(201).json(vacationAdded);

    }
    catch (err) {
        next(err);
    }


})


router.put("/admin/vacations/update/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.vacationId = +request.params.id;
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/admin/vacations/delete/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log("Here!");

        const vacationId = +request.params.vacationId;
        await vacationService.deleteProduct(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/emails", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        
        const emails = await vacationService.getAllEmailsFromDB();
        // console.log(emails);
        
        response.json(emails);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;