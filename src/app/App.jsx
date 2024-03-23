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

    console.log(result);

  }
  
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

