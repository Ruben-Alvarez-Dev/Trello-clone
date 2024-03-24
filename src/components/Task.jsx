import './Task.css';
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import trash from "../assets/trash.svg";

export const Task = ({ task, taskIndex }) => {
  
  const { lists, setLists, tasks, setTasks } = useContext(DataContext)
  
  const handleRemoveTask = (e) => {
    
    const nodeId = (e.target.parentNode.parentNode.id);
    const updatedTasks = tasks.filter((task) => task.id !== nodeId);
    setTasks(updatedTasks);

  }

  return (

        <div className='task' id={task.id}>
          <div className="task-title">
            {task.value}
          </div>
          <div className="task-remove" onClick={handleRemoveTask}>
            <img src={trash}/>
          </div>
        </div>
      
  )
}
