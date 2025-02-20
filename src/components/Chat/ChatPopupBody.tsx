import React, { useEffect, useRef, useState } from "react";
import { StudySummary } from "./ChatPopup";
import { User } from "../../utils/type";
import { ChatMessageType, wsService } from "../../lib/features/WSService";
import ChatMessage from "./ChatMessage";
import * as S from "./ChatPopupBody_style";

interface ChatPopupBodyType {
  study: StudySummary;
  user: User;
}

const ChatPopupBody: React.FC<ChatPopupBodyType> = ({ study, user }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    { id: 1, sender: "tony", text: "Hi there! Welcome to the chat." },
    { id: 2, sender: "tony2", text: "Hello! Glad to be here." },
    { id: 3, sender: "tony", text: "Feel free to ask any questions." },
    { id: 4, sender: "tony2", text: "Sure, I have a few." },
  ]);

  const [inputText, setInputText] = useState("");
  const [savedScroll, setSavedScroll] = useState(0);

  // Specify that chatBodyRef is a reference to an HTMLDivElement
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    const newMessage = {
      id: messages.length + 1,
      sender: user.email,
      text: inputText,
    };
    wsService.sendMessage(newMessage);
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  useEffect(() => {
    console.log("calling wsService ");
    const studyPath = "asdf"; // Replace with your dynamic studyPath if needed

    wsService.connect(
      studyPath,
      (newMessage) =>
        setMessages((prevMessages) => [...prevMessages, newMessage]),
      user!
    );

    // Clean up connection on unmount.
    return () => {
      wsService.disconnect();
      if (chatBodyRef.current) {
        setSavedScroll(chatBodyRef.current.scrollTop);
      }
    };
  }, []);

  // Restore saved scroll when reopening
  useEffect(() => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current!.scrollTop = savedScroll;
      }, 0);
    }
  }, [savedScroll]);

  // Auto-scroll if user is near the bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = chatBodyRef.current;
      // Debug log to check scroll values
      console.log(
        "scrollTop:",
        scrollTop,
        "clientHeight:",
        clientHeight,
        "scrollHeight:",
        scrollHeight
      );
      if (scrollTop + clientHeight >= scrollHeight - 120) {
        chatBodyRef.current.scrollTop = scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      <S.ChatBody ref={chatBodyRef}>
        {study ? (
          <>
            <S.StudyTitle>
              Chat for <strong>{study.title}</strong>
            </S.StudyTitle>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} sender={msg.sender}>
                {msg.text}
              </ChatMessage>
            ))}
          </>
        ) : (
          <S.NoStudySelected>
            Please select a study to view chats.
          </S.NoStudySelected>
        )}
      </S.ChatBody>
      {study && (
        <S.ChatInputContainer>
          <S.ChatInput
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <S.SendButton onClick={handleSend}>Send</S.SendButton>
        </S.ChatInputContainer>
      )}
    </>
  );
};

export default ChatPopupBody;
