import React from "react";
import desk from "../assets/desk.jpg";
import { useEffect, useState } from "react";
import { NavBar, Footer } from "../components";
import { IoAddOutline } from "react-icons/io5";
import axios from "axios";

const authToken = localStorage.getItem("authToken");

console.log(authToken);

const TodoListPage = ({ userId }) => {
  // const todos = ["Learn React", "Learn Tailwind", "Learn Redux"];

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await axios.get(
        "http://localhost:3001/todos",

        {
          withCredentials: true,
          Authorization: `Bearer ${authToken}`,
        }
      );
      setTasks(fetchedTasks.data);
      console.log(fetchedTasks.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/new-todo",
        {
          userId,
          task,
        },
        {
          withCredentials: true,
          Authorization: `Bearer ${authToken}`,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect accpets only normal pracitce
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section id="todo-page" className="relative">
      <div id="nav-image" className="relative">
        <div className="absolute top-0 left-0 right-0 z-20">
          <NavBar />
        </div>
        <div className="relative">
          <img
            src={desk}
            alt="image"
            className="w-full h-[300px] object-cover rounded-b-2xl"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[10] rounded-b-2xl" />
        </div>
      </div>

      <div
        id="todo-section"
        className="absolute inset-0 flex flex-col items-center justify-start z-40 top-[190px] max-w-[500px] mx-auto"
      >
        <div className="w-full   flex flex-row justify-between">
          <h1 className="text-3xl font-bold text-white">Todo</h1>
        </div>
        <form
          action=""
          className="flex items-center gap-4 mt-8"
          onSubmit={addTodo}
          method="post"
        >
          <input
            type="text"
            placeholder="Enter your task"
            className="w-[300px] md:w-[400px] xl:w-[500px] p-3 border-2 border-gray-300 rounded-xl outline-none shadow-2xl focus:border-base-300"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-circle shadow-2xl">
            <IoAddOutline />
          </button>
        </form>

        <div className="mt-8">
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="w-[300px] md:w-[400px] xl:w-[500px] flex items-center gap-4 p-3 bg-white shadow-2xl rounded-xl"
              >
                <input type="checkbox" className="w-5 h-5" />
                <p>{task.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <Footer /> */}
    </section>
  );
};

export default TodoListPage;
