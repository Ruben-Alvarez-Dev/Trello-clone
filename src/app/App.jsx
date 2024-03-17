import './App.css'
import { initData } from '../helper/InitData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const App = () => {

  const data = initData();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }


    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }


    if (type === 'task' && destination.droppableId === source.droppableId) {
      const list = data.lists.find(list => list.title === source.droppableId);
      const task = list.value.splice(source.index, 1)[0];
      list.value.splice(destination.index, 0, task);
    }


    if (type === 'task' && destination.droppableId !== source.droppableId) {
      const sourceList = data.lists.find(list => list.title === source.droppableId);
      const destinationList = data.lists.find(list => list.title === destination.droppableId);
      const task = sourceList.value.splice(source.index, 1)[0];
      destinationList.value.splice(destination.index, 0, task);
    }


    const movedList = data.lists.splice(source.index, 1)[0];
    data.lists.splice(destination.index, 0, movedList);
  }

  return (
    
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" direction="horizontal" type="list">
      {(provided) => (
        <div className="app" ref={provided.innerRef}
          {...provided.droppableProps}
          >
          {
            data.lists.map((list, index) => {
              return (

                <Draggable key={list.id} draggableId={list.id} index={index}>
                {(provided) => (
                    
                    <div className="list" ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                      <h2>{list.title}</h2>

                        <Droppable droppableId={list.title} type="task">
                        {(provided) => (
                          <div ref={provided.innerRef}
                          {...provided.droppableProps}
                          >
                            {
                              list.value.map((value, index) => {
                                return (
                                  <Draggable key={value} draggableId={value} index={index}>
                                    {(provided) => (
                                      <div className="task" ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {data.tasks.find(task => task.id === value).value}
                                      </div>
                                    )}
                                  </Draggable>
                                )
                              })
                            }
                          {provided.placeholder}
                          </div>
                        )}
                        </Droppable>
                                        
                    </div>
                    
                  )}
                </Draggable>

                )
              })
            }
          {provided.placeholder}
        </div>
      )}
      </Droppable>
      </DragDropContext>
  )
}
