import './List.css';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import trash from '../assets/trash.svg';
import { Task } from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AddCardorList } from './AddCardorList';

export const List = ({ list, index }) => {
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);
  const listTasks = list.value.map((taskId) => tasks.find((task) => task.id === taskId)).filter(Boolean);
  const [editable, setEditable] = useState(false);
  const [titleValue, setTitleValue] = useState(list.title);

  // Function to remove a list
  const handleRemoveList = () => {
    const listIndex = lists.findIndex((item) => item.id === list.id);
    const updatedLists = [...lists.slice(0, listIndex), ...lists.slice(listIndex + 1)];
    setLists(updatedLists);
    const updatedTasks = tasks.filter((task) => !list.value.includes(task.id));
    setTasks(updatedTasks);
  };

  // Function to enable editing of the list title
  const handleEditTitle = () => {
    setEditable(true);
  };

  // Function to handle changes in the list title input
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  // Function to handle blur event of the list title input
  const handleTitleBlur = () => {
    if (titleValue.trim() !== '') {
      const updatedLists = lists.map((item) => {
        if (item.id === list.id) {
          return { ...item, title: titleValue };
        }
        return item;
      });
      setLists(updatedLists);
    } else {
      setTitleValue(list.title);
    }
    setEditable(false);
  };

  return (
    <div id={list.id} className="list" index={index}>
      <div className="title">
        {editable ? (
          // Input field for editing the list title
          <input
            className='title-input'
            type="text"
            value={titleValue}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          // Display the list title as a label
          <div className="title-label" onDoubleClick={handleEditTitle}>
            {list.title}
          </div>
        )}
        {/* Button to remove the list */}
        <div className="title-remove" onClick={handleRemoveList}>
          <img src={trash} alt="Remove" />
        </div>
      </div>
      <Droppable droppableId={list.id} type="task">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {/* Render the tasks in the list */}
            {listTasks.map((task, taskIndex) => (
              <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} index={taskIndex} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* Component to add a new task or list */}
      <AddCardorList type="forTask" list={list} />
    </div>
  );
};