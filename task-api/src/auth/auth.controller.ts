import { Body, Controller, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentiasDto } from './dto/auth_credenctial.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-utilities/jwt_payload.interface';




@Controller('auth')
export class AuthController {

constructor(private _authService : AuthService ,  private _jwtService : JwtService,){ }

@Post('/signup')
async signUp(@Body(ValidationPipe) authCredencial :AuthCredentiasDto){
    console.log('cerdencials: ', authCredencial);
    return this._authService.signUp(authCredencial);
}

@Post('/signin')
async signIn(@Body() authCredencial :AuthCredentiasDto ): Promise<{accessToken:string}>{
    const username = await this._authService.sigIn(authCredencial);
    if(!username){
        throw new UnauthorizedException('invalid credentials')
    }else{
        const payload : IJwtPayload = {username}
        const accessToken = await this._jwtService.sign(payload)
        return {accessToken};
    }
}

}
