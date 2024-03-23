import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { Task } from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export const List = ({ list, index }) => {
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);

  return (
    <div className="list" key={list.id}>
      <h3>{list.title}</h3>
      <Droppable droppableId={list.id} type="task">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lists[index].value.map((taskId, taskIndex) => {
              const task = tasks.find((task) => task.id === taskId);
              return (
                <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Task task={task} index={taskIndex} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};