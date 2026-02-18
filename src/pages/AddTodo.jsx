import { useState } from "react";
import Todo from "../functions";

function AddTodo() {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        
        // Create a temporary input reference for the Todo class
        const tempInput = document.createElement('input');
        tempInput.value = inputValue;
        
        // Use the Todo class to add the todo
        const result = Todo.addTodoFromValue(inputValue);
        
        if (result) {
            setInputValue(""); // Clear input on success
            // Dispatch custom event for other components
            window.dispatchEvent(new Event("todoUpdated"));
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Add a task..." 
                    className="add-todo-input" 
                    value={inputValue}
                    onChange={handleInputChange}
                    autoFocus
                    aria-label="New todo input"
                />
                <button 
                    type="submit" 
                    className="add-todo-button"
                    disabled={!inputValue.trim()}
                >
                    Add Todo
                </button>
            </div>
        </form>
    );
}

export default AddTodo;