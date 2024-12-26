import { LoginDTO } from "./login.dto";
import { Matches, MinLength } from "class-validator";

export const PasswordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export class ChangePasswordDTO extends LoginDTO{
    @Matches(PasswordRegex, {message: 'Password must contain one capital and one special expression. Its minimum length must be 8.'})
    @MinLength(8)
    newPassword: string

    newPassword2: string
}