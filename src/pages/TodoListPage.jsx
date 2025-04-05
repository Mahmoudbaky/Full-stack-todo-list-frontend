import React from "react";
import desk from "../assets/desk.jpg";
import { useEffect, useState } from "react";
import { NavBar, Footer, ModalForm } from "../components";
import { IoAddOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import axios from "axios";

const TodoListPage = ({ authToken, userName }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

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
        setTask("");
        console.log(task);
      }
      // ("in add todo function");
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

  const openEditModal = (todo) => {
    setCurrentTask(todo);
    setIsModalVisible(true);
    isModalVisible;
  };

  const closeDialog = () => {
    setIsModalVisible(false);
    setCurrentTask(null);
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/update`,
        { updatedTodo },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTodo._id ? updatedTodo : task
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (task) => {
    try {
      console.log(task);
      const response = await axios.post(
        `http://localhost:3001/delete-todo/${task._id}`,
        { task },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect accpets only normal pracitce
  useEffect(() => {
    if (authToken) {
      fetchTasks();
    }
  }, [authToken]);

  return (
    <section id="todo-page" className="relative">
      <div id="nav-image" className="relative">
        <div className="top-0 left-0 right-0 z-20 sticky ">
          <NavBar userName={userName} />
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
        className="absolute inset-0 flex flex-col items-center justify-start z-40 top-[140px] max-w-[500px] mx-auto"
      >
        {/* Add the form to add a new task here */}
        <form
          action=""
          className="flex items-center gap-4 mt-8 flex-col"
          onSubmit={addTodo}
          method="post"
        >
          <div className="flex items-center gap-4 justify-between w-[300px] md:w-[400px] xl:w-[500px]">
            <div className="w-full   flex flex-row justify-between">
              <h1 className="text-3xl font-bold text-white">Todo</h1>
            </div>
            <button type="submit" className="btn btn-circle shadow-2xl">
              <IoAddOutline />
            </button>
          </div>
          <input
            type="text"
            value={task}
            placeholder="Enter your task"
            className="w-[300px] md:w-[400px] xl:w-[500px] p-3 border-2 border-gray-300 rounded-xl outline-none shadow-2xl focus:border-base-300"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
        </form>

        {/* Add the list of tasks here */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="w-[300px] md:w-[400px] xl:w-[500px] flex items-center justify-between gap-4 p-3 bg-white shadow-2xl rounded-xl"
              >
                <div className="flex items-center gap-4">
                  {task.completed ? (
                    <button
                      className="bg-base-300  btn btn-circle"
                      onClick={() => taskDone(task._id, task.completed)}
                    >
                      <TiTick className="text-2xl" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-circle  cursor-default"
                      onClick={() => taskDone(task._id, task.completed)}
                    ></button>
                  )}
                  {task.completed ? (
                    <p className="line-through text-gray-500">{task.text}</p>
                  ) : (
                    <p>{task.text}</p>
                  )}
                </div>
                <div className=" flex gap-3">
                  <button
                    className="btn btn-circle"
                    onClick={() => {
                      deleteTodo(task);
                    }}
                  >
                    <IoMdTrash className="text-xl" />
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() => openEditModal(task)}
                  >
                    <CiEdit className="text-xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Modal */}
          {tasks && (
            <button className="btn mx-auto mt-5 ml-0" onClick={deleteCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      </div>
      <ModalForm
        isModalVisible={isModalVisible}
        onClose={closeDialog}
        onSubmit={updateTodo}
        todo={currentTask}
      />
    </section>
  );
};

export default TodoListPage;
