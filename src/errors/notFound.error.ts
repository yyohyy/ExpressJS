import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError{
    statusCode = 404;
    constructor(message: string = "NOT FOUND"){
        super(message)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serialize (){ 
        return { message: this.message };  
    }
}