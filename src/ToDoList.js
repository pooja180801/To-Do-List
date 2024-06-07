import React, { useState } from 'react'

const ToDoList = () => {
  
    const [tasks,setTasks]=useState(JSON.parse(localStorage.getItem("to-do-list"))|| [])
    const [newTask,setNewTask]=useState("")

    function handleInputChange(e){
        setNewTask(e.target.value)

    }

    function addTask(){
        if(newTask.trim()!==""){
            setTasks(t=>[...t,newTask])
            setNewTask("")
        }
    }

    function deleteTask(index){

        const updatedTasks=tasks.filter((element,i)=>i!==index)
        setTasks(updatedTasks)
        localStorage.setItem("to-do-list",JSON.stringify(updatedTasks))
    }

    function moveTaskUp(index){
        if(index>0){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index-1]]=[updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks)
            localStorage.setItem("to-do-list",JSON.stringify(updatedTasks))
        }
    }

    function moveTaskDown(index){
        if(index<tasks.length-1){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks)
            localStorage.setItem("to-do-list",JSON.stringify(updatedTasks))
        
    }

    }

  return (
    <div className='to-do-list'>
        <h1>To-Do-List</h1>
        <div>
            <input 
            type="text"
            placeholder="Enter a task.."
            value={newTask}
            onChange={handleInputChange}
            />
            <button className="add-btn" onClick={addTask}>
                Add
            </button>
        </div>
        {tasks.length>0 ? (
        <ol>
            
            {tasks.map((task,index)=>
            <li key={index}>
                 <span className='text'>{task}</span>
                 <button className='delete-btn' onClick={()=>deleteTask(index)}>Delete</button>
                 <button className='move-btn' onClick={()=>moveTaskUp(index)}>☝</button>
                 <button className='move-btn' onClick={()=>moveTaskDown(index)}>👇</button>
            </li>
               
                )}
        </ol>
        ):(
            <p>The list is empty</p>
        )}
    </div>
  )
}

export default ToDoList
