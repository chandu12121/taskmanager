import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ProfileDetails from "../ProfileDetails";
import './index.css';

const Home = (props) => {
    const navigator = useNavigate();
    const [todoname, setTodoName] = useState("");
    const [initialTodos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [hoveredTodo, setHoveredTodo] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState("top");

    const statusOptions = ["pending", "in progress", "completed", "done"];

    const onhandleAddTodos = () => {
        if (todoname !== "") {
            const currentTime = moment().format("MMMM Do YYYY, hh:mm:ss a");
            const newTodo = { 
                text: todoname, 
                time: currentTime, 
                status: "pending", 
                id: uuidv4() 
            };

            if (isEditing) {
                const updatedTodos = initialTodos.map(eachTodo => {
                    if (editId === eachTodo.id) {
                        return { ...newTodo, id: eachTodo.id, status: eachTodo.status }; 
                    }
                    return eachTodo;
                });
                setTodos(updatedTodos);
                setEditId(null);
                setIsEditing(false);
            } else {
                setTodos([...initialTodos, newTodo]);
            }
            setTodoName("");
        } else {
            alert("Please enter a valid todo name");
        }
    };

    const onhandleEdit = (id) => {
        const todoEdit = initialTodos.find(each => each.id === id);
        if (todoEdit) {
            setIsEditing(true);
            setTodoName(todoEdit.text);
            setEditId(todoEdit.id);
        }
    };

    const onhandleDeleteTodo = (id) => {
        setTodos(initialTodos.filter(eachTodo => eachTodo.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedTodos = initialTodos.map(eachTodo => 
            eachTodo.id === id ? { ...eachTodo, status: newStatus } : eachTodo
        );
        setTodos(updatedTodos);
    };

    const onhandleLogout = () => {
        navigator("/");
    };

    const handlePopupPosition = (e) => {
        const rect = e.target.getBoundingClientRect();
        const position = rect.top > window.innerHeight / 2 ? "top" : "bottom";
        setPopupPosition(position);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="home-container">
            <div style={{textAlign:"center"}}>
                <h1>Welcome to your Daily Tasks!</h1>
                <p>Here, you can manage all your tasks efficiently. Let's make today productive!</p>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <ProfileDetails />
            <div>
            <button className="logout-btn" onClick={onhandleLogout}>Logout</button>
            </div>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter Todo Name" 
                    value={todoname} 
                    onChange={event => setTodoName(event.target.value)} 
                    className="todo-input"
                />
            </div>
            <button className="add-btn" onClick={onhandleAddTodos}>{isEditing ? "SAVE" : "ADD"}</button>
            <div>
                
                {isPopupVisible && <div className="popup-overlay" onClick={closePopup}></div>}

                <ul className="todo-list">
                    {initialTodos.map(each => (
                        <li
                            key={each.id}
                            onMouseEnter={() => setHoveredTodo(each.id)}
                            onMouseLeave={() => setHoveredTodo(null)}
                            className="todo-item"
                            onClick={(e) => handlePopupPosition(e)} 
                        >
                            <div>{each.text}</div>
                            <div>{each.time}</div>
                            <div>
                                <select 
                                    value={each.status} 
                                    onChange={(e) => handleStatusChange(each.id, e.target.value)}
                                    className="status-select"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            {hoveredTodo === each.id && isPopupVisible && (
                                <div className={`popup ${popupPosition}`} data-position={popupPosition}>
                                    <button className="edit-btn" onClick={() => onhandleEdit(each.id)}>Edit</button>
                                    <button className="delete-btn" onClick={() => onhandleDeleteTodo(each.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
