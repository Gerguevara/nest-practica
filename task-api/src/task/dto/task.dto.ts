import { IsNotEmpty } from  'class-validator' //dependencia externa

export class createTaskDto {
    @IsNotEmpty()
    tittle: string;
    
    @IsNotEmpty()
    description: string;
}

//dtos must be class 