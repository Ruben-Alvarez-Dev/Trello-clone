import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Task } from './Task'


export const List = ({ list, index }) => {
  
  const { lists, setLists, tasks, setTasks } = useContext(DataContext)

  return (
    <div className="list" index={index}>
      <h3>{list.title}</h3>
        {
          lists[index].value.map((taskId, taskIndex) => {
            const task = tasks.find((task) => task.id === taskId);
        
              return <Task key={task.id} task={task} index={taskIndex} />;
      })}
    </div>
  );
}
