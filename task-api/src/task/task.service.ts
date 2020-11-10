import { Injectable, NotFoundException } from '@nestjs/common';
import { filterTaskDto } from './dto/filterTask.dto';
import { createTaskDto } from './dto/task.dto';
import { Task, TaskStatus } from './models/task.model';

@Injectable()
export class TaskService {

    private tasks: Task[] = [];


    getAllTask(): Task[] {
        return this.tasks
    }


    getById(id: string | number): Task[] {

        const foundTask = this.tasks.filter(task => task.id === id)
        if (!foundTask || foundTask.length === 0) {
            throw new NotFoundException(`Task with id: ${id} not found`)
        }

        return foundTask
    }



    getTaskWithFilter(filter: filterTaskDto): Task[] {

        const { status, term } = filter

        let tasks = this.getAllTask()

        if (status) {
            tasks = this.tasks.filter(task => task.status === status)
        }

        if (term) {
            tasks = this.tasks.filter(task => task.tittle.includes(term) || task.description.includes(term))
        }


        return tasks
    }

    createNewTask(createTaskDto: createTaskDto): Task {

        const { tittle, description } = createTaskDto
        const newTask: Task = {
            id: JSON.stringify(new Date().getMilliseconds()),
            tittle,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(newTask)
        return newTask;
    }

    deleteTask(id): void {
        const foundTask = this.getById(id);
        this.tasks = this.tasks.filter(task => task.id !== foundTask[0].id)
    }


    updateTask(id, status: TaskStatus): Task {
        const task = this.getById(id)
        task[0].status = status
        return task[0];
    }

}
