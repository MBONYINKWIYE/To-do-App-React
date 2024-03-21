import React,{useState, useEffect} from 'react'

export const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState("")
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("tasks");
    if(localValue) {
      return JSON.parse(localValue);
    } else{
      return [];
    }
  });

   useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const handleSubmit = e =>{
    e.preventDefault();
    if(value === "") {
      alert("Add something on your list")
      return null;
    }
    addTodo(value)
    setValue("")
  }
  

  return (
    
    <form className='todoform' onSubmit={handleSubmit}>
     
      <input type="text"className='todo-input' value={value}
      placeholder="What's your Task today? "
      onChange={(e)=> setValue(e.target.value)}/>
     <button type='submit' className='btn'>Add Task</button>
    
    </form>
  )
}

