import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ChatSendInputBox } from "../chat-send-input/ChatSendInput";
import { UserChatBox } from "../chat-box/ChatBox";
import { useSocketContext } from "../../../contexts/socket-context";
import "./index.css";

export function ChatThread() {
  const { newMessage } = useSocketContext();
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    if (newMessage.message) {
      addMessagesInsideChatThread(newMessage)
    }
  }, [newMessage]);


  function addMessagesInsideChatThread(data) {
    setMessageList(prevstate => ([...prevstate, data]));
  }


  console.log(messageList, 'messageList');


  const displayUsersMessages = messageList.map((message, index) => {
    return <UserChatBox key={index} data={message} />
  });


  return (
    <>
      <div className="chat-container-child">
        <div className="chat-list-container">
          {displayUsersMessages}
        </div>
        <div className="chat-message-input-container">
          <div className="chat-message-input">
            <ChatSendInputBox />
          </div>
        </div>
      </div>
    </>
  );
}
