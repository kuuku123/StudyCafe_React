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
  const [mangerStudies, setManagerStudies] = useState<StudyDto[]>([]);
  const [memberStudies, setMemberStudies] = useState<StudyDto[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<StudySummary | null>(null);
  const { user, isAuthenticated } = useSelector(selectAuth);

  // Type the studies array
  const studies: StudySummary[] = [
    { path: "asdf1", title: "Study 1" },
    { path: "asdf2", title: "Study 2" },
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleStudyClick = (study: StudySummary) => {
    setSelectedStudy(study);
  };

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
          <S.ToggleButton onClick={toggleChat}>Study Chat</S.ToggleButton>
        )}
      </>
    );
  }
};

export default ChatPopup;
