// this pipe verifys is the frond is sending a valid task status
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../models/task.status.model";

export class validationStatusPipe implements PipeTransform {

    //by implementing the interface PipeTramsForm is mandatory implements this method also

    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        
        value = value.toUpperCase();
        if (!this.isStatusValid(value) ) {
            throw new BadRequestException(`${value} is no a valid task status`)
        }
        return value;
    }

    // valida si el status esta dentro del array de estaus que vienen del enum
    isStatusValid(status: any) {
        // estafuncion regresa o el index si esta o un -1 si no esta
       const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}