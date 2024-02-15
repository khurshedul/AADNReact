// App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage"; // Assuming you have a component named HomePage
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

function App() {
  // let token = sessionStorage.getItem("accessToken");

  return (
    <>
      <AuthenticatedTemplate>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Router>
          <Routes>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Router>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
