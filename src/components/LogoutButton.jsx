import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const authToken = localStorage.getItem("authToken");

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:3001";

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false); // Set loading to false
          navigate("/login"); // Redirect to login page }
        }, 1000);
      }
    } catch (err) {
      err;
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots bg-white loading-lg"></span>
      </div>
    ); // Render loading spinner while logging out
  }

  return (
    <button className="btn btn-sm" onClick={handleLogout}>
      Sign out
    </button>
  );
};

export default LogoutButton;
