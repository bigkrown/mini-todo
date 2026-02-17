import Todo from '../functions';
import { useState, useEffect } from 'react';

function ListTodo() {
    //const [todos, getTodos] = useState([]);

    // useEffect(() => {
    //     setInterval(() => {
    //         getTodos(Todo.getTodos());
    //     }, 1000);
    // }, []);

    return (
        <div>
            <ul className='todoList'>
                {Todo.getTodos().map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListTodo;