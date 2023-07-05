import React, { useState, useEffect, useCallback } from "react";
import { api_base } from "../config.js";
import Item from "../components/Item";
import axios from "axios";
import "../App.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {

const [text, setText] = useState("");
const [todo, setTodo] = useState([]);
const [isUpdating, setIsUpdating] = useState("");
const [cookies, setCookies] = useCookies(["access_token"]);
const navigate = useNavigate();

const getTodos = useCallback(() => {
    axios.get(`${api_base}/todos`, {
        headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            "Content-Type": "application/json",
        },
    })
    .then((res) => setTodo(res.data))
    .catch((err) => console.error("Error: ", err.message));
    }, [cookies.access_token]);


useEffect(() => {
    if (!cookies.access_token) {
    navigate("/login"); 
    } else {
    getTodos();
    }
}, [cookies.access_token, navigate, getTodos]);


const addUpdateTodo = () => {
    if (!isUpdating) {
        axios.post(`${api_base}/todos/new`,{ text },
            {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
          console.log(res.data);
          setText("");
          getTodos(); 
        })
        .catch((err) => console.log(err));
    } else {
        axios.put(`${api_base}/todos/update/${isUpdating}`,{ text },
            {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
          console.log(res.data);
          setText("");
          setIsUpdating("");
          getTodos();
        })
        .catch((err) => console.log(err));
    }
};

const deleteTodo = (_id) => {
    axios.delete(`${api_base}/todos/delete/${_id}`, {
        headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        console.log(res.data);
        getTodos(); 
    })
    .catch((err) => console.log(err));
  };

const updateTodo = (_id, text) => {
    setIsUpdating(_id);
    setText(text);
};

const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
};

    return (
        <div className="container">
        <h1>To Do App</h1>
            <div className="add-section">
                <input type="text" id="newTask" name="newTask" placeholder="Add your new task..." value={text} onChange={(e) => setText(e.target.value)} />
                <div className="add" onClick={addUpdateTodo}>
                    {isUpdating ? "Update" : "Add"}
                </div>
            </div>
            <div className="list">
            {todo.map((item) => (
                <Item key={item._id} text={item.text} remove={() => deleteTodo(item._id)} update={() => updateTodo(item._id, item.text)} />
                ))}
                <div className="logout-btn">
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

  export default TodoPage;

