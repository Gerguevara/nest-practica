import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports:[TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService]
  
})
export class TaskModule {}

/*forFeature:
 * forFeature es una configuracion que se aplica pero solo
 * aplicable unicalemente a este modulo 
 */