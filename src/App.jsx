import React, { useState, useEffect } from "react";
import { TodoListPage, SginUp, LogIn } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { use } from "react";

const App = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
    setIsAuthenticated(!!authToken);
  }, [authToken]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SginUp />} />
        <Route path="/login" element={<LogIn setAuthToken={setAuthToken} />} />
        <Route
          path="/todo-page"
          element={
            isAuthenticated ? (
              <TodoListPage authToken={authToken} />
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
