import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './models/task.status.model';

import { createTaskDto } from './dto/task.dto';
import { filterTaskDto } from './dto/filterTask.dto';
import { validationStatusPipe } from './pipes/taskStatusValidation.pipe';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {

   constructor(private _taslService: TaskService) { }


   // @Get()//el validation pipe de aca esta basado en el dto para los parametros opcinales
   // getAlltasks(@Query(ValidationPipe) filter: filterTaskDto): Task[] {
   //    if (Object.keys(filter).length) {
   //       console.log('Incluye un query', Object.keys(filter).length);
   //       return this._taslService.getTaskWithFilter(filter);
   //    }
   //    else {
   //       return this._taslService.getAllTask()
   //    }
   // }

   @Get('/:id')
   getOneTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {      
      return this._taslService.getById(id)
   }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
     return this._taslService.createTask(createTaskDto);
   }

   // @Delete()
   // deleteOneTask(@Query('id') id: string): boolean {
   //    this._taslService.deleteTask(id);
   //    return true
   // }


   // @Patch('/:id/:status')
   // updateTask(@Param('id') id: string, @Param('status', validationStatusPipe) status: TaskStatus): boolean {
   //    this._taslService.updateTask(id, status);
   //    return true
   // }
}
