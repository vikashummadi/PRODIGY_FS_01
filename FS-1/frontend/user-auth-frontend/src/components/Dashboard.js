import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        if (res && res.data) {
          setUser(res.data);
        } else {
          throw new Error("Invalid response");
        }
      })
      .catch(() => {
        alert("Not Authorized! Please Login");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {user ? <h3>Welcome {user.name}</h3> : <p>Loading user info...</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
