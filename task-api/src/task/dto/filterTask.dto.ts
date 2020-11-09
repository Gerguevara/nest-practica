import { TaskStatus } from "../models/task.model";

export class filterTaskDto{
    status?:TaskStatus;
    term?: string;
}