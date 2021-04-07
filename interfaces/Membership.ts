export interface NameInterface { first?: string, middle?: string, last?: string, nick?: string, display?: string }
export interface ContactInfoInterface { address1?: string, address2?: string, city?: string, state?: string, zip?: string, homePhone?: string, mobilePhone?: string, workPhone?: string, email?: string }
export interface FormInterface { id?: string, name?: string, contentType?: string }
export interface AnswerInterface { id?: string, value?: string, questionId?: string, formSubmissionId?: string }
export interface QuestionInterface { id?: string, formId?: string, title?: string, fieldType?: string, placeholder?: string, description?: string, choices?: [{ value?: string, text?: string }] }
export interface FormSubmissionInterface { id?: string, formId?: string, contentType?: string, contentId?: string, form?: FormInterface, answers?: AnswerInterface[], questions?: QuestionInterface[] }
export interface PersonInterface { id?: string, name: NameInterface, contactInfo?: ContactInfoInterface, membershipStatus?: string, gender?: string, birthDate?: Date, maritalStatus?: string, anniversary?: Date, photo?: string, photoUpdated?: Date, householdId?: string, householdRole?: string, userId?: string, formSubmissions?: [FormSubmissionInterface] }
export interface HouseholdInterface { id?: string, name?: string }