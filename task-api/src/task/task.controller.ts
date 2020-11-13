import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './models/task.status.model';

import { createTaskDto } from './dto/task.dto';
import { filterTaskDto } from './dto/filterTask.dto';
import { validationStatusPipe } from './pipes/taskStatusValidation.pipe';
import { Task } from './entity/task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

   constructor(private _taslService: TaskService) { }

   @Get()
   getTasks(@Query(ValidationPipe) filterTaskDto: filterTaskDto) : Promise<Task[]>{
      return this._taslService.getTasks(filterTaskDto);
   }

   @Get('/:id')
   getOneTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this._taslService.getById(id)
   }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
      return this._taslService.createTask(createTaskDto);
   }

   @Delete('/:id')
   deleteOneTask(@Param('id', ParseIntPipe) id: number) {
      return this._taslService.deleteTask(id);
   }


   @Patch('/:id/:status')
   updateTask(@Param('id', ParseIntPipe) id: number, @Param('status', validationStatusPipe) status: TaskStatus): Promise<Task> {
      return this._taslService.updateTask(id, status);
   }
}
