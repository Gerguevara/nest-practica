import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/task.dto";
import { TaskStatus } from "./models/task.status.model";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { tittle, description } = createTaskDto;
        const task = new Task();
        task.title = tittle;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

}