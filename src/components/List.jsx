import './List.css';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import trash from '../assets/trash.svg';
import { Task } from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AddCardorList } from './AddCardorList';
import { UI_STRINGS } from '../constants';

/**
 * List component that renders a draggable list containing tasks.
 * Provides functionality for editing list title, removing lists, and managing tasks.
 * @param {Object} props - Component props
 * @param {ListEntity} props.list - List object containing id, title, and value (task IDs)
 * @param {number} props.index - Index of the list for drag and drop ordering
 * @returns {JSX.Element} Draggable list component with tasks and controls
 *
 * @example
 * <List list={{ id: 'list-1', title: 'To Do', value: [] }} index={0} />
 */
export const List = ({ list, index }) => {
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);
  const listTasks = list.value.map((taskId) => tasks.find((task) => task.id === taskId)).filter(Boolean);
  const [editable, setEditable] = useState(false);
  const [titleValue, setTitleValue] = useState(list.title);

  /** Removes the current list and all its associated tasks. */
  const handleRemoveList = () => {
    const listIndex = lists.findIndex((item) => item.id === list.id);
    const updatedLists = [...lists.slice(0, listIndex), ...lists.slice(listIndex + 1)];
    setLists(updatedLists);
    const updatedTasks = tasks.filter((task) => !list.value.includes(task.id));
    setTasks(updatedTasks);
  };

  /** Enables editing mode for the list title. */
  const handleEditTitle = () => {
    setEditable(true);
  };

  /** Update temporary title value while editing. */
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  /** Persist title changes on blur, or revert if empty. */
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
    <div id={list.id} className="list">
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
          <img src={trash} alt={UI_STRINGS.REMOVE} />
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
                    <Task task={task} />
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
