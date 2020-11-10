import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './models/task.model';

import { createTaskDto } from './dto/task.dto';
import { filterTaskDto } from './dto/filterTask.dto';
import { validationStatusPipe } from './pipes/taskStatusValidation.pipe';

@Controller('task')
export class TaskController {

   constructor(private _taslService: TaskService) { }


   @Get()//el validation pipe de aca esta basado en el dto para los parametros opcinales
   getAlltasks(@Query(ValidationPipe) filter: filterTaskDto): Task[] {
      if (Object.keys(filter).length) {
         console.log('Incluye un query', Object.keys(filter).length);
         return this._taslService.getTaskWithFilter(filter);
      }
      else {
         return this._taslService.getAllTask()
      }
   }

   @Get('/:id')
   getOneTask(@Param('id') id: string): Task[] {
      console.log('id', id);
      return this._taslService.getById(id)
   }



   @Post()
   @UsePipes(ValidationPipe) //trabaja en conjunto con class-validator en el dto
   createANewTask(@Body() task: createTaskDto): Task {
      return this._taslService.createNewTask(task);
   }

   // @Post()
   // createANewTaskAlt(@Body('tittle') tittle : string, 
   //                @Body('description') description : string) :Task{
   //    return this._taslService.createNewTask(description ,tittle);
   // }

   @Delete()
   deleteOneTask(@Query('id') id: string): boolean {
      this._taslService.deleteTask(id);
      return true
   }


   @Patch('/:id/:status')
   updateTask(@Param('id') id: string, @Param('status', validationStatusPipe) status: TaskStatus): boolean {
      this._taslService.updateTask(id, status);
      return true
   }
}
