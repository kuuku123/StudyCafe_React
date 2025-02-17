import React, { useState, useRef, useEffect } from "react";
import * as S from "./ChatPopup_style";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const studies = [
    { id: 1, name: "Study 1" },
    { id: 2, name: "Study 2" },
    { id: 3, name: "Study 3" },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: "tony", text: "Hi there! Welcome to the chat." },
    { id: 2, sender: "tony2", text: "Hello! Glad to be here." },
    { id: 3, sender: "tony", text: "Feel free to ask any questions." },
    { id: 4, sender: "tony2", text: "Sure, I have a few." },
  ]);

  const [inputText, setInputText] = useState("");
  const [savedScroll, setSavedScroll] = useState(0);

  const chatBodyRef = useRef(null);

  const toggleChat = () => {
    if (isOpen && chatBodyRef.current) {
      setSavedScroll(chatBodyRef.current.scrollTop);
    }
    setIsOpen(!isOpen);
  };

  const handleStudyClick = (study) => {
    setSelectedStudy(study);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: user.nickname,
      text: inputText,
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  // Restore saved scroll when reopening
  useEffect(() => {
    if (isOpen && chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current.scrollTop = savedScroll;
      }, 0);
    }
  }, [isOpen, savedScroll]);

  // Auto-scroll if user is near the bottom
  useEffect(() => {
    if (isOpen && chatBodyRef.current) {
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
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        chatBodyRef.current.scrollTop = scrollHeight;
      }
    }
  }, [messages, isOpen]);

  return (
    <>
      {isOpen ? (
        <S.ChatContainer>
          <S.ChatHeader>
            <S.StudyList>
              {studies.map((study) => (
                <S.StudyItem
                  key={study.id}
                  onClick={() => handleStudyClick(study)}
                  active={selectedStudy?.id === study.id}
                >
                  {study.name}
                </S.StudyItem>
              ))}
            </S.StudyList>
            <S.MinimizeButton onClick={toggleChat}>ㅡ</S.MinimizeButton>
          </S.ChatHeader>
          <S.ChatBody ref={chatBodyRef}>
            {selectedStudy ? (
              <>
                <S.StudyTitle>
                  Chat for <strong>{selectedStudy.name}</strong>
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
          {selectedStudy && (
            <S.ChatInputContainer>
              <S.ChatInput
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />
              <S.SendButton onClick={handleSend}>Send</S.SendButton>
            </S.ChatInputContainer>
          )}
        </S.ChatContainer>
      ) : (
        <S.ToggleButton onClick={toggleChat}>Study Chat</S.ToggleButton>
      )}
    </>
  );
};

export default ChatPopup;
