import { PersonInterface } from "./Membership";

export interface ConnectionInterface { id?: string, churchId?: string, conversationId?: string, userId?: string, displayName?: string, timeJoined?: Date, socketId?: string }
export interface ConversationInterface { id?: string, churchId?: string, contentType?: string, contentId?: string, title?: string, dateCreated?: Date, groupId?: string, visibility?: string, firstPostId?: string, lastPostId?: string, postCount?: number, allowAnonymousPosts?: boolean }
export interface MessageInterface {
  id?: string, churchId?: string, conversationId?: string, userId?: string, personId?: string, displayName?: string, timeSent?: Date, timeUpdated?: Date, messageType?: string, content?: string,
  person?: PersonInterface
}
