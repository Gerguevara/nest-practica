import { Injectable } from '@nestjs/common';
import { filterTaskDto } from './dto/filterTask.dto';
import { createTaskDto } from './dto/task.dto';
import { Task, TaskStatus } from './models/task.model';

@Injectable()
export class TaskService {

    private tasks: Task[] = [];


    getAllTask(): Task[] {
        return this.tasks
    }


    getOneTask(id): Task[] {
        return this.tasks.filter(task => task.id === id)
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
        this.tasks = this.tasks.filter(task => task.id !== id)

    }


    updateTask(id, status: TaskStatus): Task {
        const task = this.getOneTask(id)
        task[0].status = status
        return task[0];
    }

}
