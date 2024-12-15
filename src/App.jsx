import React, { useState, useEffect } from "react";
import { TodoListPage, SginUp, LogIn } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { use } from "react";

const App = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);

      const decodedToken = jwtDecode(authToken);
      const storedUsername = decodedToken.username;
      setUserName(storedUsername);
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
    }
    setIsAuthenticated(!!authToken);
  }, [authToken]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SginUp />} />
        <Route
          path="/login"
          element={
            <LogIn setAuthToken={setAuthToken} setUserNameNav={setUserName} />
          }
        />
        <Route
          path="/todo-page"
          element={
            isAuthenticated ? (
              <TodoListPage authToken={authToken} userName={userName} />
            ) : (
              <LogIn setAuthToken={setAuthToken} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
