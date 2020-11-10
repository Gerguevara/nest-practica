import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterTaskDto } from './dto/filterTask.dto';
import { createTaskDto } from './dto/task.dto';
import { TaskStatus } from './models/task.status.model';
import { Task } from './entity/task.entity';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {

    // se inyecta el repository aqui para utilizar sus metodos base y custom
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }


    async getTasks(filterDto : filterTaskDto):Promise<Task[]>{        
      return this.taskRepository.getTasks(filterDto);
    }

    async getById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne(id);

        if (!foundTask) {
            throw new NotFoundException(`Task with id: ${id} not found`)
        }
        return foundTask;
    }


    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }


    async deleteTask(id): Promise<Boolean> {
        const result = await this.taskRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id: ${id} not found`)
        }
        else {
            return true
        }
    }

    async updateTask(id, status: TaskStatus): Promise<Task> {
        const task = await this.getById(id)
        task.status = status
        await task.save()
        return task
    }
}
