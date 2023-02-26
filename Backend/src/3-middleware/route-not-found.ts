import { Request, Response, NextFunction } from "express";
import { RouteNotFoundError } from "../4-models/client-errors";


function routeNotFound(request: Request, response: Response, next: NextFunction): void {
    const errorMessage = new RouteNotFoundError(request.originalUrl);
    next(errorMessage);
}
export default routeNotFound;
