import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "../dto/task.dto";
import { TaskStatus } from "../models/task.status.model";
import { Task } from "../entity/task.entity";
import { filterTaskDto } from "../dto/filterTask.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

   // logig for save a new task, this method is called in the service
    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { tittle, description } = createTaskDto;
        const task = new Task();
        task.title = tittle;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    //Get All task withor withour filter, this method is called in the service
    async getTasks(filterTaskDto: filterTaskDto): Promise<Task[]>{
        
        const {status, term } = filterTaskDto
        const query = this.createQueryBuilder('task') 
        /**
         * 1- query builder el parametro 'task' sera como llamaremos a 
         *     nuestra entidad en las interacciones con la BS
         */
        if(status){
            query.andWhere('task.status = :status',{status});
        }

        if(term){
            query.andWhere('task.title LIKE :term OR task.description  LIKE :term',{term:`%${term}%`})
        }
        /**
         * 2- se utiliza andWhere porque estos se suman al query, no se sobre
         * escriben, trabajan en conjunto
         * 
         * 3-  se utiliza {term : `%${term}%`} para que aceptar partes de
         * texto, no terminos completos para devolver resultados de busqueda
         * 
         * 4- se envuelven en () para indicar que es una sola consulta
         */
        const tasks = await query.getMany()
        return tasks
    }
}