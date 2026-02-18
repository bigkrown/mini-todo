import { useEffect, useState } from "react";
import Todo from "../functions";

function ShowTodo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Initial load
        setTodos(Todo.getTodos());

        // Subscribe to todo changes
        const unsubscribe = Todo.addListener((updatedTodos) => {
            setTodos([...updatedTodos]); // Create new array to trigger re-render
        });

        // Also listen for storage events (for cross-tab updates)
        const handleStorageChange = (e) => {
            if (e.key === "todos") {
                setTodos(Todo.getTodos());
            }
        };
        
        window.addEventListener("storage", handleStorageChange);

        return () => {
            unsubscribe();
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleToggleTodo = (index) => {
        Todo.toggleTodoCompletion(index);
        // No need to update state here - listener will handle it
    };

    const handleDeleteTodo = (index) => {
        Todo.deleteTodo(index);
        // No need to update state here - listener will handle it
    };

    if (todos.length === 0) {
        return (
            <div className="show-todo">
                <h2>Todo List <span className="todo-count">(0)</span></h2>
                <ul className='todoList'>
                    <li className="no-todos">No todos yet.</li>
                </ul>
            </div>
        );
    }

    return (
        <div className="show-todo">
            <h2>Todo List <span className="todo-count">({todos.length})</span></h2>
            <ul className='todoList'>
                {todos.map((todo, index) => (
                    <li key={`todo-${index}`} id={`todo-${index}`}>
                        <div 
                            className="todoItem" 
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        >
                            <input 
                                type="checkbox" 
                                className="task-done" 
                                checked={todo.completed || false}
                                onChange={() => handleToggleTodo(index)}
                            />
                            &nbsp;&nbsp; {todo.text}
                        </div>
                        <div 
                            className="deleteBtn" 
                            onClick={() => handleDeleteTodo(index)}
                            role="button"
                            tabIndex={0}
                        >
                            delete
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShowTodo;