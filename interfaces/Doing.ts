export interface TaskInterface {
    id?: string,
    taskType?: string,
    dateCreated?: Date,
    dateClosed?: Date,
    associatedWithType?: string,
    associatedWithId?: string,
    createdByType?: string,
    createdById?: string,
    assignedToType?: string,
    assignedToId?: string,
    title?: string,
    details?: string
}
