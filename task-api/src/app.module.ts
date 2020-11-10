import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
  TypeOrmModule.forRoot(typeOrmConfig),
  TaskModule
] 
})
export class AppModule {}

/*Notes:
 * 1- .forRoot es una configuracion que se aplica globalmente a todos
   los modulos
 */