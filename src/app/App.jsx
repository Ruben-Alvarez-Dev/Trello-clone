import './App.css';
import React, { useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { List } from '../components/List';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export const App = () => {

  // ===============================================
  // Vars and States
  // ===============================================
  
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Cargar los datos de localStorage al iniciar la aplicación
    const storedLists = localStorage.getItem('lists');
    const storedTasks = localStorage.getItem('tasks');

    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Guardar los datos en localStorage cada vez que cambien
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [lists, tasks]);

  
  // ===============================================  
  // Functions
  // ===============================================

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
  
    if (!destination) {
      return;
    }
  
    if (type === 'list') {
      const newLists = Array.from(lists);
      const [removedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removedList);
  
      setLists(newLists);
    }
  
    if (type === 'task') {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find((list) => list.id === destination.droppableId);
      const draggingTask = tasks.find((task) => task.id === draggableId);
  
      if (sourceList === destinationList) {
        const newTaskIds = Array.from(sourceList.value);
        const [removedTaskId] = newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, removedTaskId);
  
        const newList = {
          ...sourceList,
          value: newTaskIds,
        };
  
        const newLists = lists.map((list) => (list.id === sourceList.id ? newList : list));
  
        setLists(newLists);
      } else {
        const sourceTaskIds = Array.from(sourceList.value);
        const [removedTaskId] = sourceTaskIds.splice(source.index, 1);
  
        const destinationTaskIds = Array.from(destinationList.value);
        destinationTaskIds.splice(destination.index, 0, removedTaskId);
  
        const newSourceList = {
          ...sourceList,
          value: sourceTaskIds,
        };
  
        const newDestinationList = {
          ...destinationList,
          value: destinationTaskIds,
        };
  
        const newLists = lists.map((list) => {
          if (list.id === sourceList.id) {
            return newSourceList;
          }
          if (list.id === destinationList.id) {
            return newDestinationList;
          }
          return list;
        });
  
        setLists(newLists);
      }
    }
  };

  
  return (
    <DataContext.Provider value={{ lists, setLists, tasks, setTasks }}>
      <>
        <h1>Trello Clon App</h1>

          <DragDropContext onDragEnd={onDragEnd}> 
          <Droppable droppableId="all-lists" direction="horizontal" type="list">            
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>

                    <div className="app">
                      {
                        lists.map((list, index) => (
                          
                            <Draggable key={list.id} draggableId={list.id} index={index}>
                            {(provided)=>(
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <List list={list} index={index}/>
                              </div>
                            )}
                            </Draggable>

                        ))
                      }
                    </div>
              {provided.placeholder}
              </div>
            )}
          </Droppable>
          </DragDropContext>

      </>
    </DataContext.Provider>
  );


}

