import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests

const LoginPage = () => {
  const { instance } = useMsal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleAadLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accounts = await instance.loginPopup(loginRequest); // Use MSAL for AAD login
      console.log("Account:", accounts.accessToken);
      sessionStorage.setItem("accessToken", accounts.accessToken);
      // Handle successful AAD login (e.g., store token, redirect to protected routes)
      history("/home"); // Replace with your appropriate redirection
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleTraditionalLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7194/login", {
        userName: username,
        passWord: password,
      }); // Send username/password to your API

      if (response.data != null) {
        const token = response.data.token; // Extract token from response
        console.log("Token:", token);
        // Store token securely (e.g., in local storage or a secure cookie)
        // Optionally, store additional user information for personalization
        sessionStorage.setItem("accessToken", token);
        history("/home"); // Replace with your appropriate redirection
      } else {
        console.error("Login failed:", response.data.error);
        // Display an error message to the user
      }
    } catch (error) {
      console.error("API error:", error);
      // Handle API errors gracefully (e.g., display a fallback message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleTraditionalLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit">
          Sign in with Local Account
        </Button>
      </form>
      <form onSubmit={handleAadLogin}>
        <Button variant="primary" type="submit">
          Sign in with AAD
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
