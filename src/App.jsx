import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingPage from "./pages/ProfileSettingPage";
import * as MyLayout from "./lib/MyLayout";
import EmailReSendPage from "./pages/EmailReSendPage";
import CreateStudyPage from "./pages/CreateStudyPage";
import StudyPage from "./pages/StudyPage";
import Study_Info from "./pages/StudyPage/ComponentPage/Info";

const App = ({ tab }) => {
  const homePage = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
    },
    {
      path: "/sign-up",
      element: <SignupPage></SignupPage>,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/profile",
      element: <ProfilePage></ProfilePage>,
    },
    {
      path: "/profile-setting",
      element: <ProfileSettingPage></ProfileSettingPage>,
    },
    {
      path: "/email-resend",
      element: <EmailReSendPage></EmailReSendPage>,
    },
    {
      path: "/create-study",
      element: <CreateStudyPage></CreateStudyPage>,
    },
    {
      path: "/study",
      element: <StudyPage></StudyPage>,
    },
    {
      path: "/study/info",
      element: <Study_Info></Study_Info>,
    },
  ]);
  return (
    <MyLayout.Layout>
      <RouterProvider router={homePage}></RouterProvider>
    </MyLayout.Layout>
  );
};
export default App;
