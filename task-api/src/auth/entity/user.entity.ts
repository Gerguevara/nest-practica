import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    //validate if passwor do match 
    async validatePassword(password: string):Promise <boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash == this.password;
    }



}