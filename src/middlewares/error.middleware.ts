import { Request, Response,NextFunction } from "express";
import { CustomError } from "../errors/custom.error";

export const errorHandler =(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err)
    if (err instanceof CustomError){
        res.status(err.statusCode).json({ error: err.serialize()});
     }
     res.status(500).send({
         error: "Something went wrong. An unexpected error occurred" })
    console.error(err)
     }

 
