import React from "react";
import { Loading } from "../";
import { ApiHelper, ArrayHelper } from "../../helpers";
import { ConversationInterface } from "../../interfaces";
import { Conversation } from "./Conversation";
import { NewConversation } from "./NewConversation";

interface Props {
  contentType: string;
  contentId: string;
  groupId: string;
}

export function Conversations(props: Props) {

  const [conversations, setConversations] = React.useState<ConversationInterface[]>(null)
  //const [editMessageId, setEditMessageId] = React.useState(null)

  const loadConversations = async () => {
    console.log("MADE IT");
    console.log(props.contentId);
    const conversations: ConversationInterface[] = (props.contentId) ? await ApiHelper.get("/conversations/" + props.contentType + "/" + props.contentId, "MessagingApi") : [];
    if (conversations.length > 0) {
      const peopleIds: string[] = [];
      conversations.forEach(c => {
        c.messages.forEach(m => {
          if (peopleIds.indexOf(m.personId) === -1) peopleIds.push(m.personId);
        });
      })
      const people = await ApiHelper.get("/people/ids?ids=" + peopleIds.join(","), "MembershipApi");
      conversations.forEach(c => {
        c.messages.forEach(m => {
          m.person = ArrayHelper.getOne(people, "id", m.personId);
        });
      })
    }
    setConversations(conversations);
    //setEditMessageId(null);
  };

  const getConversations = () => {
    if (!conversations) return <Loading />
    if (conversations.length === 0) return <></>
    else {
      let noteArray: React.ReactNode[] = [];
      for (let i = 0; i < conversations.length; i++) noteArray.push(<Conversation conversation={conversations[i]} key={conversations[i].id} />);
      return noteArray;
    }
  }

  React.useEffect(() => { loadConversations() }, [props.contentId]); //eslint-disable-line

  return (
    <>
      <NewConversation contentType={props.contentType} contentId={props.contentId} onUpdate={loadConversations} groupId={props.groupId} visibility="public" />
      {getConversations()}

    </>
  );
};