import React,{useState, useEffect} from 'react'
import {TodoForm} from './TodoForm'
import {Todo} from './Todo'
import { EditTodoForm } from './EditTodoForm'


const TodoWrapper = () => {
  var count = Math.random();
  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("todos");
    if(localValue) {
      return JSON.parse(localValue);
    } else{
      return [];
    }
  });

   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  const addTodo = todo =>{
    setTodos([...todos,{id: {count}, task: todo, completed: false, isEditing: false}])
    console.log(todos);
  }

const toggleComplete = id =>{
  setTodos(todos.map(todo => todo.id === id ? {
    todo, completed : true} : todo))
}

const deleteTodo = id => {
  setTodos(todos.filter(todo => todo.id !== id))
}

const editTodo = id => {
  setTodos(todos.map(todo => todo.id === id ? {...todo, 
    isEditing: !todo.isEditing} : todo))
}

const editTask = (task, id) => {
   setTodos(todos.map(todo => todo.id === id ? {
    todo, task, isEditing: !todo.isEditing}: todo
     ))
}

  return (
    <div className='todowrapper'>
      <h1>Get Things Done</h1>
      <TodoForm addTodo={addTodo}/>
      {todos.map((todo, index) => (
       todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ):
       
       ( <Todo task = {todo} key={index} toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} editTodo={editTodo} />
       )

      ))}
      
    </div>
  )
       
}

export default TodoWrapper