import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError{
    statusCode = 401;
    constructor(message: string = "Unauthorized"){
        super(message)
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
    
    serialize (){ 
        console.log(this.message)
        return { message: this.message };  
    }
}