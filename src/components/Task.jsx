import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export const Task = ({ task, taskIndex }) => {
  
  const { lists, setLists, tasks, setTasks } = useContext(DataContext)
  
  return (

        <div className='task'>
          <p>{task.value}</p>
        </div>
      
  )
}
