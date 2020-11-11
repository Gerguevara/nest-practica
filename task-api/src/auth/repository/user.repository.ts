import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import {  EntityRepository, Repository } from "typeorm"
import { AuthCredentiasDto } from "../dto/auth_credenctial.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialDto: AuthCredentiasDto): Promise<Boolean> {

        const { username, password } = authCredentialDto;
        const user = new User();
        user.username = username;
        user.password = password;
        try {
            await user.save()

            return true
        } catch (error) {
            
            console.log('error code', error.code);
            
            //duplicate username
            if(error.code === '23505'){
                throw new ConflictException('Username already exists')
            }else{
                throw new InternalServerErrorException();
            }            
        }

    }

}