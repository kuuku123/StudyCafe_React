import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingPage from "./pages/ProfileSettingPage";
import * as MyLayout from "./lib/MyLayout";

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
      element: <ProfilePage></ProfilePage>
    },
    {
      path: "/profile-setting",
      element: <ProfileSettingPage></ProfileSettingPage>
    }
  ]);
  return (
    <MyLayout.Layout>
      <RouterProvider router={homePage}></RouterProvider>
    </MyLayout.Layout>
  );
};
export default App;
