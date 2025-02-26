import React, { useEffect, useRef, useState } from "react";
import { StudySummary } from "./ChatPopup";
import { User } from "../../utils/type";
import { ChatMessageType, WSService } from "../../lib/features/WSService";
import ChatMessage from "./ChatMessage";
import * as S from "./ChatPopupBody_style";
import ChatApi from "../../lib/apis/ChatApi";
import { v4 as uuidv4 } from "uuid";

interface ChatPopupBodyType {
  study: StudySummary;
  user: User;
}

const ChatPopupBody: React.FC<ChatPopupBodyType> = ({ study, user }) => {
  console.log("ChatPopupBody rerender => ", study);
  // Only create the service ONCE per component instance:
  const wsServiceRef = useRef<WSService | null>(null);
  if (!wsServiceRef.current) {
    wsServiceRef.current = new WSService();
  }
  const wsService = wsServiceRef.current;
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const [inputText, setInputText] = useState("");
  const [savedScroll, setSavedScroll] = useState(0);

  // Specify that chatBodyRef is a reference to an HTMLDivElement
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    const newMessage = {
      id: uuidv4(),
      studyPath: study.path,
      email: user.email,
      text: inputText,
      createdAt: new Date(),
    };
    wsService.sendMessage(newMessage);
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  useEffect(() => {
    console.log("calling wsService ", study);

    wsService.connect(
      study.path,
      (newMessage) =>
        setMessages((prevMessages) => [...prevMessages, newMessage]),
      user!
    );
    const getAllChats = async () => {
      const response = await ChatApi.getAllChats(study.path);
      console.log("getAllChats => ", response);
      setMessages(response.data);
    };

    getAllChats();

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
    console.log("savedScroll!! out if");
    if (chatBodyRef.current) {
      console.log("savedScroll!!");
      setTimeout(() => {
        chatBodyRef.current!.scrollTop = savedScroll;
      }, 0);
    }
  }, [savedScroll]);

  // Auto-scroll if user is near the bottom
  useEffect(() => {
    console.log("Auto Scroll!! out if");
    if (chatBodyRef.current) {
      console.log("Auto Scroll!! ");
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
      // if (scrollTop + clientHeight >= scrollHeight - 120) {
      chatBodyRef.current.scrollTop = scrollHeight;
      console.log("scrollTop => ", chatBodyRef.current.scrollTop, scrollHeight);
      // }
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
              <ChatMessage key={msg.id} sender={msg.email}>
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
