// 리액트 18 기준
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App tab="home" />);
