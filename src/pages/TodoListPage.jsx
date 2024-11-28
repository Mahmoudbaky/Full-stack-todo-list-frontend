import React from "react";
import desk from "../assets/desk.jpg";
import { Navbar } from "../components";

const TodoListPage = () => {
  const parentStyle = {
    backgroundImage: `url(${desk})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", // Adjust as needed (cover, contain, etc.)
    backgroundColor: "black", // Fallback color if the image doesn't load
    minHeight: "100vh", // Ensure the background covers the entire viewport
  };

  const overLay = {
    minHeight: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity of the overlay
  };

  return (
    <section id="todo-page">
      <div id="nav-image">
        <div
          className="flex justify-center items-center h-[500px]"
          style={parentStyle}
        >
          <div style={overLay}>
            <Navbar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoListPage;

{
  /* <img src={desk} alt="image" className="object-bottom" /> */
}
