import { ChatSendInputBox } from "../chat-send-input/ChatSendInput";
import { UserChatBox } from "../chat-box/ChatBox";
import { useSocketContext } from "../../../contexts/socket-context";
import "./index.css";

export function ChatThread() {
  const { messageList } = useSocketContext();

  const displayUsersMessages = messageList.map((message, index) => {
    return <UserChatBox key={index} data={message} />;
  });

  return (
    <>
      <div className="chat-container-child">
        <div className="chat-list-container">{displayUsersMessages}</div>
        <div className="chat-message-input-container">
          <div className="chat-message-input">
            <ChatSendInputBox />
          </div>
        </div>
      </div>
    </>
  );
}
