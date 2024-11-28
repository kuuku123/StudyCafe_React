import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import * as MyLayout from "./lib/MyLayout";
import EmailReSendPage from "./pages/EmailReSendPage";
import CreateStudyPage from "./pages/CreateStudyPage";
import StudyAdminPage from "./pages/MyStudyListPage/MyStudyAdminPage";
import MyStudyListPage from "./pages/MyStudyListPage";
import ErrorPage from "./pages/ErrorPage";
import RoutesEnum from "./lib/RoutesEnum";
import PublicStudyPage from "./pages/JoinStudyPage";
import { Provider } from "react-redux";
import store, { persistor } from "./lib/features/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SocialAccountSetPasswordPage from "./pages/LoginPage/social/SocialAccountSetPassword";
import MergeAccountPage from "./pages/LoginPage/social/MergeAccountPage";
import AlreadyMergedAccountPage from "./pages/LoginPage/social/AlreadyMergedAccountPage";
import ProfileSettingPage from "./pages/ProfileSettingPage";
import { sseService } from "./lib/features/SSEService";
import StudyGuestPage from "./pages/MyStudyListPage/MyStudyGuestPage";

const App = () => {
  const homePage = createBrowserRouter([
    {
      path: RoutesEnum.HOME,
      element: <HomePage />,
    },
    {
      path: RoutesEnum.SIGN_UP,
      element: <SignupPage />,
    },
    {
      path: RoutesEnum.LOGIN,
      element: <LoginPage />,
    },
    {
      path: RoutesEnum.ALREADY_MERGED_ACCOUNT,
      element: <AlreadyMergedAccountPage></AlreadyMergedAccountPage>,
    },
    {
      path: RoutesEnum.MERGE_ACCOUNT,
      element: <MergeAccountPage></MergeAccountPage>,
    },
    {
      path: RoutesEnum.SOCIAL_ACCOUNT_SET_PASSWORD,
      element: <SocialAccountSetPasswordPage></SocialAccountSetPasswordPage>,
    },
    {
      path: RoutesEnum.PROFILE,
      element: <ProfilePage />,
    },
    {
      path: RoutesEnum.PROFILE_SETTING,
      element: <ProfileSettingPage></ProfileSettingPage>,
    },
    {
      path: RoutesEnum.EMAIL_RESEND,
      element: <EmailReSendPage />,
    },
    {
      path: RoutesEnum.CREATE_STUDY,
      element: <CreateStudyPage />,
    },
    {
      path: RoutesEnum.JOIN_STUDY,
      element: <PublicStudyPage />,
    },
    {
      path: RoutesEnum.MY_STUDY_LIST,
      element: <MyStudyListPage />,
    },
    {
      path: RoutesEnum.STUDY_ADMIN(),
      element: <StudyAdminPage />,
    },
    {
      path: RoutesEnum.STUDY_GUEST(),
      element: <StudyGuestPage />,
    },
    {
      path: RoutesEnum.ERROR,
      element: <ErrorPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MyLayout.Layout>
          <RouterProvider router={homePage}></RouterProvider>
        </MyLayout.Layout>
      </PersistGate>
    </Provider>
  );
};
export default App;
