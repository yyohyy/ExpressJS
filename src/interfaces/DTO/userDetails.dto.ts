import { Expose } from "class-transformer"
import { IsAlpha, IsEmail , IsIn, IsEnum, IsNumber, IsOptional, Matches, MinLength, Length } from "class-validator"
import { PasswordRegex } from "./changePassword.dto"

export enum UserRole {
    Admin = 'admin',
    User = 'user'
  }

export class AuthDTO{
  @Expose()
  @IsEmail()
  email: string
  
  @Matches(PasswordRegex, {message: 'Password must contain one capital and one special expression. Its minimum length must be 8.'})
  @MinLength(8)
  password: string

  password2: string
  @IsIn(['admin','user'])
  role: string

}

export class UserDetailsDTO extends AuthDTO{

    @IsEnum(UserRole, { message: "Role must be one of [admin, user]" })
    role: UserRole;
  
    @IsOptional()
    @IsNumber()
    @Length(10)
    phoneNo?: number
    
    @Expose()
    @IsAlpha()
    @MinLength(3)
    firstName: string
    
    @Expose()
    @IsAlpha()
    @MinLength(3)
    lastName: string
}



