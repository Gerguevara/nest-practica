export interface Task{
    id?: string,
    tittle: string,
    description: string,
    status: TaskStatus
}

// tatus task avalible
export enum TaskStatus{
    OPEN='OPEN',
    IN_PROGRESS='IN_PROGRESS',
    DONE = 'DONE'
}