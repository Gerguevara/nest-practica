import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentiasDto } from './dto/auth_credenctial.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {

    constructor  (@InjectRepository(UserRepository)
                 private userRepository : UserRepository                                
                 ){}   
   
   async  signUp( authCredentialDto :  AuthCredentiasDto) : Promise<Boolean>{
        return await this.userRepository.signUp(authCredentialDto)
    }    

    async sigIn(authCredentialDto :  AuthCredentiasDto):Promise<string>{
        return this.userRepository.validateUserPassword(authCredentialDto)
    }

}
