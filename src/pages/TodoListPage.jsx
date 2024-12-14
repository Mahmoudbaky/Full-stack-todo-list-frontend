import React from "react";
import desk from "../assets/desk.jpg";
import { useEffect, useState } from "react";
import { NavBar, Footer } from "../components";
import { IoAddOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import axios from "axios";

const authToken = localStorage.getItem("authToken");

const TodoListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await axios.get("http://localhost:3001/todos", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTasks(fetchedTasks.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault(); // dont forget the preventDefault for every single from please :)

    try {
      const response = await axios.post(
        "http://localhost:3001/new-todo",
        {
          task,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks((prevTasks) => [...prevTasks, response.data.data]);
        setTask(""); // it is not working for some reason, I will fix it later :)
      }
      console.log("in add todo function");
    } catch (err) {
      console.log(err);
    }
  };

  const taskDone = async (id, isTrue) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/update-todo/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!isTrue) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: true } : task
          )
        );
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: false } : task
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCompleted = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/delete-completed",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.completed === false)
        );
      }
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
        <div className="top-0 left-0 right-0 z-20 sticky ">
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
                {task.completed ? (
                  <button
                    className="bg-base-300  btn btn-circle"
                    onClick={() => taskDone(task._id, task.completed)}
                  >
                    <TiTick />
                  </button>
                ) : (
                  <button
                    className="btn btn-circle  cursor-default"
                    onClick={() => taskDone(task._id, task.completed)}
                  ></button>
                )}
                {task.completed ? (
                  <p className="line-through">{task.text}</p>
                ) : (
                  <p>{task.text}</p>
                )}
              </li>
            ))}
          </ul>
          <button className="btn mx-auto" onClick={deleteCompleted}>
            Clear Completed
          </button>
        </div>
      </div>

      {/* <Footer /> */}
    </section>
  );
};

export default TodoListPage;
