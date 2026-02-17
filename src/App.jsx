import './App.css'
import { useState,useEffect } from 'react'
import ShowTodo from './pages/ShowTodo'
import AddTodo from './pages/AddTodo';





function App() {
//  const [showTodo, setShowTodo] = useState(false);
  return (
    <>
      <div>
        <div className="app">
          <h1>Mini Todo</h1>
          <AddTodo />
          <ShowTodo />
        </div>  
      </div>
    </>
  )
}

export default App
