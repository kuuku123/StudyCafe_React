import React from "react";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
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
  ])
  return (
    <div>
      <RouterProvider router={homePage}></RouterProvider>
    </div>
  );
};
export default App;
