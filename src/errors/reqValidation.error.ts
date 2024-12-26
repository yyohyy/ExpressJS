import { CustomError } from "./custom.error";

export class ReqValidationError extends CustomError{
    statusCode = 400;
    constructor(message: string = "Bad Request"){
        super(message)
        Object.setPrototypeOf(this, ReqValidationError.prototype)
    }
    
    serialize (){ 
        console.log(this.message)
        return { message: this.message };  
    }
}