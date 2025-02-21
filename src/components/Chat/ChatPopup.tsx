import React, { useState, useRef, useEffect } from "react";
import * as S from "./ChatPopup_style";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { selectAuth } from "../../lib/features/redux/authSelector";
import { StudyDto } from "../../utils/type";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";
import DOMPurify from "dompurify";
import StudyMemberApi from "../../lib/apis/StudyMemberApi";
import ChatPopupBody from "./ChatPopupBody";

export type StudySummary = Pick<StudyDto, "title" | "path">;

const ChatPopup = () => {
  console.log("ChatPOPUp get rereder? ===================?? ");
  const [isOpen, setIsOpen] = useState(false);
  const [studies, setStudies] = useState<StudySummary[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<StudySummary | null>(null);
  const { user, isAuthenticated } = useSelector(selectAuth);

  // Type the studies array

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleStudyClick = (study: StudySummary) => {
    setSelectedStudy(study);
  };

  const handleManagerMemberStudies = (studies: StudyDto[]) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map(({ title, path }) => ({ title, path }))
      : [];
    console.log("sanitizedStudies => ", sanitizedStudies);
    setStudies(sanitizedStudies);
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("ChatPopup getting study list called ===> ");
      const getStudyLists = async () => {
        const response1 = await StudyManagerApi.fetchStudyList();
        const response2 = await StudyMemberApi.fetchStudyList();
        const response = response1.data.concat(response2.data);
        console.log("+ ===> ", response);
        handleManagerMemberStudies(response);
      };
      getStudyLists();
    }
  }, [isOpen]);

  if (isAuthenticated) {
    return (
      <>
        {isOpen ? (
          <S.ChatContainer>
            <S.ChatHeader>
              <S.StudyList>
                {studies.length > 0 ? (
                  studies.map((study) => (
                    <S.StudyItem
                      key={study.path}
                      onClick={() => handleStudyClick(study)}
                      active={selectedStudy?.path === study.path}
                    >
                      {study.title}
                    </S.StudyItem>
                  ))
                ) : (
                  <p>Join Study to Chat</p>
                )}
              </S.StudyList>
              <S.MinimizeButton onClick={toggleChat}>ㅡ</S.MinimizeButton>
            </S.ChatHeader>

            {studies.map((study) => (
              <div
                key={study.path}
                style={{
                  visibility:
                    selectedStudy?.path === study.path ? "visible" : "hidden",
                  position:
                    selectedStudy?.path === study.path ? "static" : "absolute",
                  pointerEvents:
                    selectedStudy?.path === study.path ? "auto" : "none",
                }}
              >
                <ChatPopupBody study={study} user={user!} />
              </div>
            ))}
          </S.ChatContainer>
        ) : (
          <S.ChatBubbleContainer>
            <S.SpeechImage
              onClick={toggleChat}
              src="/images/chat.webp"
              width="200"
            ></S.SpeechImage>
            <S.ImageText>Study Chat</S.ImageText>
          </S.ChatBubbleContainer>
        )}
      </>
    );
  }
};

export default ChatPopup;
