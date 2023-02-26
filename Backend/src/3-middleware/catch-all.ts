import { Request, Response, NextFunction } from "express";



function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
    const status = err.status || 500;
    response.status(status).send(err.message);

}
export default catchAll;
