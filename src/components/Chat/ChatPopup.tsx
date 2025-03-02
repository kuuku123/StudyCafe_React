import React, { useState, useEffect } from "react";
import * as S from "./ChatPopup_style";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/redux/authSelector";
import { StudyDto } from "../../utils/type";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";
import StudyMemberApi from "../../lib/apis/StudyMemberApi";
import ChatPopupBody from "./ChatPopupBody";
import { Resizable } from "re-resizable";

export type StudySummary = Pick<StudyDto, "title" | "path">;

const ChatPopup = () => {
  console.log("ChatPOPUp get rereder? ===================?? ");
  const [isOpen, setIsOpen] = useState(false);
  const [studies, setStudies] = useState<StudySummary[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<StudySummary | null>(null);
  const { user, isAuthenticated } = useSelector(selectAuth);

  // Add state for storing dimensions
  const [dimensions, setDimensions] = useState({
    width: 300,
    height: 530,
  });

  // Load saved dimensions from localStorage on initial render
  useEffect(() => {
    const savedDimensions = localStorage.getItem("chatPopupDimensions");
    if (savedDimensions) {
      setDimensions(JSON.parse(savedDimensions));
    }
  }, []);
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

  // Handler for resize events
  const handleResize = (size: { width: number; height: number }) => {
    setDimensions(size);
    localStorage.setItem("chatPopupDimensions", JSON.stringify(size));
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

  const ChatContainer_style = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    fontFamily: "Arial, sans-serif",
    zIndex: 3,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  } as const;

  if (isAuthenticated) {
    return (
      <>
        {isOpen ? (
          <Resizable
            defaultSize={dimensions}
            style={ChatContainer_style}
            minWidth={300}
            maxHeight={700}
            onResizeStop={(e, direction, ref, d) => {
              handleResize({
                width: dimensions.width + d.width,
                height: dimensions.height + d.height,
              });
            }}
          >
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
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
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
          </Resizable>
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
