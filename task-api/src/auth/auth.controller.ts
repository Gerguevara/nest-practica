import { Body, Controller, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentiasDto } from './dto/auth_credenctial.dto';

@Controller('auth')
export class AuthController {

constructor(private _authService : AuthService){ }

@Post('/signup')
async signUp(@Body(ValidationPipe) authCredencial :AuthCredentiasDto){
    console.log('cerdencials: ', authCredencial);
    return this._authService.signUp(authCredencial);
}

@Post('/signin')
async signIn(@Body() authCredencial :AuthCredentiasDto){
    const user = await this._authService.sigIn(authCredencial);
    if(!user){
        throw new UnauthorizedException('invalid credentials')
    }else{
        return user;
    }
}
}
