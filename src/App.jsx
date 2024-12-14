import React, { useState } from "react";
import { TodoListPage, SginUp, LogIn } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { use } from "react";

const App = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  // console.log(userId);

  return (
    <>
      <Routes>
        <Route path="/" element={<SginUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/todo-page" element={<TodoListPage userId={userId} />} />
      </Routes>
    </>
  );
};

export default App;
