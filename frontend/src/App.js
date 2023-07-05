import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useLocalStorage from "use-local-storage";
import ReactSwitch from "react-switch";
import "./App.css"


function App() {
    const [theme, setTheme] = useLocalStorage("theme", "dark");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div className={`App ${theme}`}>
            <div className="switch">
                <label htmlFor="themeSwitch"> {theme === "light" ? "Light Mode " : "Dark Mode "}</label>
                <ReactSwitch id="themeSwitch" onChange={toggleTheme} checked={theme === "dark"} onColor="#92d1d4" onHandleColor="#f6ff71" />   
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/todos" element={<TodoPage />} />
            </Routes>
            </div>
    );
}

export default App;