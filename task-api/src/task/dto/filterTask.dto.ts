import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../models/task.status.model";

export class filterTaskDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS]) //util para enums
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    term: string;
}