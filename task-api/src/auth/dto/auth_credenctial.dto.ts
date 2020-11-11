import { IsString, Matches, MaxLength, MinLength } from  'class-validator' //dependencia externa
export class AuthCredentiasDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ , 
            {message:'password too weak'})
    password: string;
}