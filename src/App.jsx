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
      <TodoListPage userId={userId} />
      {/* <SginUp /> */}
      <LogIn setUserId={setUserId} />
    </>
  );
};

export default App;
