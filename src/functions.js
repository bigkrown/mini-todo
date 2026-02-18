// Updated functions.js (Todo class)
class Todo {
  constructor(listTodo = []) {
    this.listeners = [];
    this.loadFromLocalStorage();
  }

  // Add a listener (React components can register here)
  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  // Notify all listeners of changes
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.listTodo));
  }

  loadFromLocalStorage() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        if (Array.isArray(parsed)) {
          if (parsed.length > 0 && typeof parsed[0] === 'string') {
            this.listTodo = parsed.map(text => ({ text, completed: false }));
          } else {
            this.listTodo = parsed;
          }
        } else {
          this.listTodo = [];
        }
      } catch (e) {
        console.error("Error parsing todos:", e);
        this.listTodo = [];
      }
    } else {
      this.listTodo = [];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.listTodo));
    this.notifyListeners();
    // Also dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent("todoUpdated", { detail: this.listTodo }));
  }

  addTodo(cs) {
    const input = document.querySelector(cs);
    if (!input) return false;

    const val = input.value.trim();
    if (val === "") {
      alert("Please enter a todo item.");
      return false;
    }

    this.listTodo.push({
      text: val,
      completed: false
    });
    
    this.saveToLocalStorage();
    input.value = "";
    return false;
  }

  deleteTodo(index) {
    if (index >= 0 && index < this.listTodo.length) {
      this.listTodo.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  toggleTodoCompletion(index) {
    if (index >= 0 && index < this.listTodo.length) {
      this.listTodo[index].completed = !this.listTodo[index].completed;
      this.saveToLocalStorage();
    }
  }

  getTodos() {
    return [...this.listTodo];
  }

  getTodoCount() {
    return this.listTodo.length;
  }

  clearTodos() {
    this.listTodo = [];
    this.saveToLocalStorage();
  }
}

export default new Todo();