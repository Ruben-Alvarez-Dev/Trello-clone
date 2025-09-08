import './Task.css';
import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import trash from "../assets/trash.svg";
import { UI_STRINGS } from '../constants';

/**
 * Task component that renders individual draggable tasks within lists.
 * Provides functionality for editing task content and removing tasks.
 *
 * @param {Object} props - Component props
 * @param {Task} props.task - Task object containing id and value
 * @param {number} props.index - Index of the task for drag and drop ordering
 * @returns {JSX.Element} Draggable task component with edit and delete functionality
 *
 * @example
 * // Inside a list
 * <Task task={{ id: 't1', value: 'Buy milk' }} index={0} />
 */
export const Task = ({ task, index }) => {
  // Accessing the data from the DataContext
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);

  // State for controlling the edit mode
  const [editable, setEditable] = useState(false);

  // State for storing the task value
  const [taskValue, setTaskValue] = useState(task.value);

  // Function to handle the removal of a task
  const handleRemoveTask = (e) => {
    const taskId = e.target.parentNode.parentNode.id;

    // Updating the lists by removing the task from the corresponding list
    const updatedLists = lists.map((list) => {
      if (list.value.includes(taskId)) {
        return { ...list, value: list.value.filter((id) => id !== taskId) };
      }
      return list;
    });

    // Updating the tasks by removing the task
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    // Updating the state with the updated lists and tasks
    setLists(updatedLists);
    setTasks(updatedTasks);
  };

  // Function to handle the edit mode of a task
  const handleEditTask = () => {
    setEditable(true);
  };

  // Function to handle the change of a task value
  const handleTaskChange = (e) => {
    setTaskValue(e.target.value);
  };

  // Function to handle the blur event of a task (when the input loses focus)
  const handleTaskBlur = () => {
    if (taskValue.trim() !== '') {
      // Updating the tasks with the new value
      const updatedTasks = tasks.map((item) => {
        if (item.id === task.id) {
          return { ...item, value: taskValue };
        }
        return item;
      });
      setTasks(updatedTasks);
    } else {
      // If the task value is empty, revert back to the original value
      setTaskValue(task.value);
    }
    setEditable(false);
  };

  return (
    <div className='task' id={task.id}>
      {editable ? (
        // Render an input field in edit mode
        <input
          className="input"
          type="text"
          value={taskValue}
          onChange={handleTaskChange}
          onBlur={handleTaskBlur}
          autoFocus
        />
      ) : (
        // Render the task value in non-edit mode
        <div className="task-title" onDoubleClick={handleEditTask}>
          {task.value}
        </div>
      )}
      {/* Render the remove button */}
      <div className="task-remove" onClick={handleRemoveTask}>
        <img src={trash} alt={UI_STRINGS.REMOVE} />
      </div>
    </div>
  );
};
