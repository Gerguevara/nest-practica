import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//jwt security
import { UserRepository } from './repository/user.repository';
import { JwtEstrategy } from './passport_strategies/jwt.strategy';


@Module({
  imports: [
    //type ORM setup  
    TypeOrmModule.forFeature([UserRepository])
    ,
    //jwt setup
    JwtModule.register({
      secret: 'MiFirmaSecretaParaTokens',
      signOptions: {
        expiresIn: 3600
      }
    }),
    // passpor setup
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],//end imports
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtEstrategy
  ],
  exports: [
    AuthService,
    JwtEstrategy,
    PassportModule
  ],

})
export class AuthModule { }
