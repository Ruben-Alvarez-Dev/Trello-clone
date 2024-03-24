import './List.css';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import trash from '../assets/trash.svg';
import { Task } from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export const List = ({ list, index }) => {
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);

  const listTasks = list.value.map((taskId) => tasks.find((task) => task.id === taskId)).filter(Boolean);
  const [ editable, setEditable ] = useState(false)

  const handleRemoveList = () => {
    // Add your logic here to handle removing the list
  };

  
  

  return (
    <div className="list" index={index}>
      <div className="title">
        {
          editable
            ? console.log('editable')
            : console.log('non editable')
            

        }
        <div className="title-label" onDoubleClick={}>{list.title}</div>
        <div className="title-remove" onClick={handleRemoveList}>
          <img src={trash} alt="Remove" />
        </div>
      </div> {/* Add closing tag for the 'div' element */}
      
      <Droppable droppableId={list.id} type="task">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {listTasks.map((task, taskIndex) => (
              <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Task task={task} index={taskIndex} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};


