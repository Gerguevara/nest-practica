import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from "@nestjs/passport";
import { InjectRepository } from '@nestjs/typeorm';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { User } from '../entity/user.entity';
import { IJwtPayload } from '../jwt-utilities/jwt_payload.interface';
import { UserRepository } from '../repository/user.repository';



@Injectable()
export class JwtEstrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'MiFirmaSecretaParaTokens',
            });
    }

    // todo lo que aqui se devuelva sera inyetado en request
    async validate(payload: IJwtPayload):Promise<User> {
        const {username} = payload
        const user = await this.userRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user
    }
}

/*
1- en el constructor se inyecta el repositorio de usuario u objeto de coneccion
la base de datos, para volverlo mienbro de la clase.

2- se configura en el constructor con el metodo super la configuracion de 
la estrategia, que va estraer e token del header con estandar bearer
y se pasa el key para decodificar es token.

3-se sobre escribe el metodo validate que ya forma parte de la clase
porque extiende de PassportStrategy, este con ayuda del repository
va extraer el usuario y lo va  a buscar en la base de datos, si np
lo encuentra arroja un la excepcion de unauthorize, si lo encuentra
pega toda su data al reques.
*/