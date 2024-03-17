import './App.css'
import { initData } from '../helper/InitData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
/* import { Input } from '../components/Input'; */
import { useState, useEffect } from 'react';
import { AddCardorList } from '../components/AddCardorList';

export const App = () => {

  const [data, setData] = useState({
    lists: initData().lists,
    tasks: initData().tasks,
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLists = localStorage.getItem('lists');
      if (storedLists) {
        const parsedLists = JSON.parse(storedLists);
        setData(prevData => ({
          ...prevData,
          lists: parsedLists,
        }));
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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

    localStorage.setItem('lists', JSON.stringify(data.lists));
    localStorage.setItem('tasks', JSON.stringify(data.tasks));
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
                      <div className="listName">{list.title}</div>

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
                                        <div className="task-title">
                                          {data.tasks.find(task => task.id === value).value}
                                        </div>
                                        <div className="task-remove">
                                          rem
                                        </div>
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
                      <AddCardorList list={list} setData={setData}/>

                      {/* <Input type={"addTask"} list={list} setData={setData}/> */}                            
                    </div>
                    
                  )}
                </Draggable>

                )
              })
            }
          {provided.placeholder}
          <AddCardorList setData={setData}/>

          {/* <Input type={"addList"} style="inputList"/> */}                            
        </div>
      )}
      </Droppable>
      </DragDropContext>
  )
}
