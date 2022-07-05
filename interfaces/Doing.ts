export interface TaskInterface {
  id?: string,
  taskNumber?: number,
  taskType?: string,
  dateCreated?: Date,
  dateClosed?: Date,
  associatedWithType?: string,
  associatedWithId?: string,
  associatedWithLabel?: string,
  createdByType?: string,
  createdById?: string,
  createdByLabel?: string,
  assignedToType?: string,
  assignedToId?: string,
  assignedToLabel?: string,
  title?: string,
  status?: string
}
