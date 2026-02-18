class Todo {
  constructor(listTodo = []) {
    this.listTodo = listTodo;
  }

  addTodo(cs) {
    this.val = document.querySelector(cs).value;
    if(this.val.trim() === "") {
      alert("Please enter a todo item.");
      return false; // Prevent form submission
    }
    this.listTodo.push(this.val);
    console.log("Adding todo:", this.val);
    document.querySelector(cs).value = ""; // Clear the input field
    document.querySelector('.todoList').innerHTML = this.listTodo.map(todo => `<li>${todo} delete</li>`).join('');
    //alert(this.getTodos());
    return false; // Prevent form submission
    // Here you can add code to save the todo to a database or local storage
  }

  getTodos() {
    return this.listTodo;
  }
}

export default new Todo();
