export interface ActionInterface { id?: string, automationId?: string, actionType?: string, actionData?: string }
export interface AutomationInterface { id?: string, title: string, active: boolean }
export interface Condition { id?: string, conditionGroupId?: string, field?: Date, fieldData?: Date, operator?: string, value?: string }
export interface ConditionGroup { id?: string, automationId?: string, parentGroupId?: string, groupType?: string }
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
