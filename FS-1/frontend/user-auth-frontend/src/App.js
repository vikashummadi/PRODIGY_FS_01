import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <header style={{ padding: "10px", backgroundColor: "#eee" }}>
        <nav>
          <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
          <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
          <Link to="/dashboard" style={{ margin: "0 10px" }}>Dashboard</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
