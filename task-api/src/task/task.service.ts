import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterTaskDto } from './dto/filterTask.dto';
import { createTaskDto } from './dto/task.dto';
import { TaskStatus } from './models/task.status.model';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {

    // se inyecta el repository aqui para utilizar sus metodos base y custom
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }


    // async getAllTask(): Promise<Task[]> {
    //     const foundTask = await this.taskRepository
    // }

    async getById(id: number): Promise<Task> {

        const foundTask = await this.taskRepository.findOne(id);

        if (!foundTask) {
            throw new NotFoundException(`Task with id: ${id} not found`)
        }
        return foundTask;
    }

    // getTaskWithFilter(filter: filterTaskDto): Task[] {

    //     const { status, term } = filter

    //     let tasks = this.getAllTask()

    //     if (status) {
    //         tasks = this.tasks.filter(task => task.status === status)
    //     }

    //     if (term) {
    //         tasks = this.tasks.filter(task => task.tittle.includes(term) || task.description.includes(term))
    //     }


    //     return tasks
    // }

    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
      }

    // deleteTask(id): void {
    //     const foundTask = this.getById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== foundTask[0].id)
    // }


    // updateTask(id, status: TaskStatus): Task {
    //     const task = this.getById(id)
    //     task[0].status = status
    //     return task[0];
    // }

}
