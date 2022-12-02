import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./UserPages/Login";
import Signup from "./UserPages/Signup";
import PasswordReset from "./UserPages/PasswordReset";
import Home from "./UserPages/Home";
import Navbar from "./UserPages/Navbar";
import { createContext, useContext, useState } from "react";
import AdminDashboard from "./AdminPages/AdminDashboard";
const userContext = createContext();

function App() {
  const [user_data, setUser_data] = useState({});
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState({});
  const [x_auth_token, setx_auth_token] = useState("");
  const store = {
    user_data,
    setUser_data,
    login,
    setLogin,
    message,
    setMessage,
    x_auth_token,
    setx_auth_token,
    role,
    setRole,
  };
  return (
    <div className="App">
      <userContext.Provider value={store}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route eact path="/signup" element={<Signup />} />
          <Route eact path="/passwordreset" element={<PasswordReset />} />
          <Route eact path="/admin" element={<AdminDashboard />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export const useData = () => useContext(userContext);
export default App;
