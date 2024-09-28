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
import StudyPage from "./pages/MyStudyListPage/MyStudyPage";
import MyStudyListPage from "./pages/MyStudyListPage";
import ErrorPage from "./pages/ErrorPage";
import RoutesEnum from "./lib/RoutesEnum";
import PublicStudyPage from "./pages/JoinStudyPage";
import { Provider } from "react-redux";
import store, { persistor } from "./lib/features/store";
import { PersistGate } from "redux-persist/integration/react";

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
      path: RoutesEnum.PROFILE,
      element: <ProfilePage />,
    },
    {
      path: RoutesEnum.PROFILE_SETTING,
      element: <ProfileSettingPage />,
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
      path: RoutesEnum.STUDY(),
      element: <StudyPage />,
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
