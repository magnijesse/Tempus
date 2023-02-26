import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import App from "./components/App.js";

// renders React Component "Root" into the DOM element with ID "root"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);

// allows for live updating
module.hot.accept();
