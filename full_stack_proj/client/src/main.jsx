import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider.jsx";
import "./index.css";
// import VoterProvider from "./context/VoterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        {/* <VoterProvider> */}
          <App />
        {/* </VoterProvider> */}
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
