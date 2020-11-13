import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports:[TypeOrmModule.forFeature([TaskRepository]),
            AuthModule
            ],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService]
  
})
export class TaskModule {}

/*forFeature:
 * forFeature es una configuracion que se aplica pero solo
 * aplicable unicalemente a este modulo 
 */