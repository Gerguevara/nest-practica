import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './models/task.model';

import { createTaskDto } from './dto/task.dto';
import { filterTaskDto } from './dto/filterTask.dto';

@Controller('task')
export class TaskController {

    constructor(private _taslService: TaskService) {  }


    @Get()
    getAlltasks(@Query() filter : filterTaskDto) :Task[]{

         if(Object.keys(filter).length){
            console.log(filter);            
            return this._taslService.getTaskWithFilter( filter);
         }
         else{
            return this._taslService.getAllTask()
         }


    }

    @Get()
    getOneTask(@Query('id') id : string) :Task[]{
       return this.getOneTask(id)
    }    
   


    @Post()
    createANewTask(@Body() task : createTaskDto) :Task{
       return this._taslService.createNewTask(task);
    }

    // @Post()
    // createANewTaskAlt(@Body('tittle') tittle : string, 
    //                @Body('description') description : string) :Task{
    //    return this._taslService.createNewTask(description ,tittle);
    // }

    @Delete()
    deleteOneTask(@Query('id') id : string) :boolean{              
       this._taslService.deleteTask(id);
       return true
    }


    @Patch('/:id/:status')
    updateTask( @Param('id') id : string, @Param('status') status: TaskStatus) :boolean{
        this._taslService.updateTask(id, status);
        return true
    }
}
