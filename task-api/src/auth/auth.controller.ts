import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentiasDto } from './dto/auth_credenctial.dto';

@Controller('auth')
export class AuthController {


    constructor(private _authService : AuthService){

    }

@Post('/signup')
signUp(@Body(ValidationPipe) authCredencial :AuthCredentiasDto){
    console.log('cerdencials: ', authCredencial);
    return this._authService.signUp(authCredencial);
}

}
