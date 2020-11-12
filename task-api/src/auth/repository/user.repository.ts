import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm"
import { AuthCredentiasDto } from "../dto/auth_credenctial.dto";
import * as bcypt from 'bcrypt';
import { User } from "../entity/user.entity";



@EntityRepository(User)
export class UserRepository extends Repository<User>{

// save the user
    async signUp(authCredentialDto: AuthCredentiasDto): Promise<Boolean> {
        const salt = await bcypt.genSalt() //salt generates a has the is added to th psw

        const { username, password } = authCredentialDto;
        const user = new User();
        user.username = username;
        user.password = await this.hashPassord(password, salt);
        user.salt = salt;

        try {
            await user.save()

            return true
        } catch (error) {

            console.log('error code', error.code);

            //duplicate username
            if (error.code === '23505') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    // encrypt the password
    private async hashPassord(password: string, salt: string): Promise<string> {
        return bcypt.hash(password, salt);
    }


    //verify if user and passwor do match with the stored
    async validateUserPassword(authCredentialDto: AuthCredentiasDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.findOne({ username })

        if (user) {
            if (await user.validatePassword(password)) {
                return user.username;
            }
            else {
                return null;
            }
        }
        return null;
    }

}

/*Esta clase contiende todo los metodos que hereda de la clase repository
pero tambien puede contener sus metodos propios y logica */