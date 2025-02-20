import React, { useState, useRef, useEffect } from "react";
import * as S from "./ChatPopup_style";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { selectAuth } from "../../lib/features/redux/authSelector";
import { StudyDto } from "../../utils/type";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";
import DOMPurify from "dompurify";
import StudyMemberApi from "../../lib/apis/StudyMemberApi";
import { wsService } from "../../lib/features/WSService";

export type StudySummary = Pick<StudyDto, "title" | "path">;

const ChatPopup = () => {
  console.log("ChatPOPUp get rereder? ===================?? ");
  const [isOpen, setIsOpen] = useState(false);
  const [mangerStudies, setManagerStudies] = useState<StudyDto[]>([]);
  const [memberStudies, setMemberStudies] = useState<StudyDto[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<StudySummary | null>(null);
  const { user, isAuthenticated } = useSelector(selectAuth);

  // Type the studies array
  const studies: StudySummary[] = [{ path: "asdf", title: "Study 1" }];

  const [messages, setMessages] = useState([
    { id: 1, sender: "tony", text: "Hi there! Welcome to the chat." },
    { id: 2, sender: "tony2", text: "Hello! Glad to be here." },
    { id: 3, sender: "tony", text: "Feel free to ask any questions." },
    { id: 4, sender: "tony2", text: "Sure, I have a few." },
  ]);

  const [inputText, setInputText] = useState("");
  const [savedScroll, setSavedScroll] = useState(0);

  // Specify that chatBodyRef is a reference to an HTMLDivElement
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    if (isOpen && chatBodyRef.current) {
      setSavedScroll(chatBodyRef.current.scrollTop);
    }
    setIsOpen(!isOpen);
  };

  const handleStudyClick = (study: StudySummary) => {
    setSelectedStudy(study);
  };

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

  // Restore saved scroll when reopening
  useEffect(() => {
    if (isOpen && chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current!.scrollTop = savedScroll;
      }, 0);
    }
  }, [isOpen, savedScroll]);

  const handleManagerStudies = (studies: StudyDto[]) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map((study) => ({
          ...study,
          fullDescription: DOMPurify.sanitize(study.fullDescription),
          studyImage: "data:image/png;base64," + study.studyImage,
        }))
      : [];
    console.log("sanitizedStudies => ", sanitizedStudies);
    setManagerStudies(sanitizedStudies);
  };

  const handleMemberStudies = (studies: StudyDto[]) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map((study) => ({
          ...study,
          fullDescription: DOMPurify.sanitize(study.fullDescription),
          studyImage: "data:image/png;base64," + study.studyImage,
        }))
      : [];
    console.log("handleMemberStudies => ", sanitizedStudies);
    setMemberStudies(sanitizedStudies);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const getManagerStudyList = async () => {
        const response = await StudyManagerApi.fetchStudyList();
        handleManagerStudies(response.data);
      };
      const getMemberStudyList = async () => {
        const response = await StudyMemberApi.fetchStudyList();
        handleMemberStudies(response.data);
      };
      getManagerStudyList();
      getMemberStudyList();
    }
  }, []);

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
      if (scrollTop + clientHeight >= scrollHeight - 120) {
        chatBodyRef.current.scrollTop = scrollHeight;
      }
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isAuthenticated) {
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
      };
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <>
        {isOpen ? (
          <S.ChatContainer>
            <S.ChatHeader>
              <S.StudyList>
                {studies.map((study) => (
                  <S.StudyItem
                    key={study.path}
                    onClick={() => handleStudyClick(study)}
                    active={selectedStudy?.path === study.path}
                  >
                    {study.title}
                  </S.StudyItem>
                ))}
              </S.StudyList>
              <S.MinimizeButton onClick={toggleChat}>ㅡ</S.MinimizeButton>
            </S.ChatHeader>
            <S.ChatBody ref={chatBodyRef}>
              {selectedStudy ? (
                <>
                  <S.StudyTitle>
                    Chat for <strong>{selectedStudy.title}</strong>
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
          </S.ChatContainer>
        ) : (
          <S.ToggleButton onClick={toggleChat}>Study Chat</S.ToggleButton>
        )}
      </>
    );
  }
};

export default ChatPopup;
