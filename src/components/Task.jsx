import './Task.css';
import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import trash from "../assets/trash.svg";

export const Task = ({ task, taskIndex }) => {
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);
  const [editable, setEditable] = useState(false);
  const [taskValue, setTaskValue] = useState(task.value);

  const handleRemoveTask = (e) => {
    const taskId = e.target.parentNode.parentNode.id;
    const updatedLists = lists.map((list) => {
      if (list.value.includes(taskId)) {
        return { ...list, value: list.value.filter((id) => id !== taskId) };
      }
      return list;
    });
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setLists(updatedLists);
    setTasks(updatedTasks);
  };

  const handleEditTask = () => {
    setEditable(true);
  };

  const handleTaskChange = (e) => {
    setTaskValue(e.target.value);
  };

  const handleTaskBlur = () => {
    if (taskValue.trim() !== '') {
      const updatedTasks = tasks.map((item) => {
        if (item.id === task.id) {
          return { ...item, value: taskValue };
        }
        return item;
      });
      setTasks(updatedTasks);
    } else {
      setTaskValue(task.value);
    }
    setEditable(false);
  };

  return (
    <div className='task' id={task.id}>
      {editable ? (
        <input
          className="input"
          type="text"
          value={taskValue}
          onChange={handleTaskChange}
          onBlur={handleTaskBlur}
          autoFocus
        />
      ) : (
        <div className="task-title" onDoubleClick={handleEditTask}>
          {task.value}
        </div>
      )}
      <div className="task-remove" onClick={handleRemoveTask}>
        <img src={trash} alt="Remove" />
      </div>
    </div>
  );
};