import Todo from '../functions';
function AddTodo() {
    return (
        <form className="add-todo-form">
            <input type="text" placeholder="Add a task" className="add-todo-input" />
            <button type="button" className="add-todo-button" onClick={() => Todo.addTodo('.add-todo-input')} >Add</button>
        </form>
    );
}

export default AddTodo;