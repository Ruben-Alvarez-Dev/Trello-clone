import './App.css';
import React, { useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { List } from '../components/List';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AddCardorList } from '../components/AddCardorList';

export const App = () => {

  // ===============================================
  // Vars and States
  // ===============================================
  
  const [lists, setLists] = useState([]); // State to store the lists
  const [tasks, setTasks] = useState([]); // State to store the tasks
  const [forceRender, setForceRender] = useState(false);


  useEffect(() => {
    // Load data from localStorage when the application starts
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
    // Save the data to localStorage whenever they change
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    
  }, [lists, tasks]);

  
  // ===============================================  
  // Drag and Drop Helper Functions
  // ===============================================

  // Handle reordering lists horizontally
  const handleListReorder = (lists, source, destination) => {
    const newLists = Array.from(lists);
    const [removedList] = newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, removedList);
    return newLists;
  };

  // Handle reordering tasks within the same list
  const handleTaskReorderSameList = (lists, sourceList, source, destination) => {
    const newTaskIds = Array.from(sourceList.value);
    const [removedTaskId] = newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, removedTaskId);

    const newList = {
      ...sourceList,
      value: newTaskIds,
    };

    return lists.map((list) => (list.id === sourceList.id ? newList : list));
  };

  // Handle moving tasks between different lists
  const handleTaskMoveBetweenLists = (lists, sourceList, destinationList, source, destination) => {
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

    return lists.map((list) => {
      if (list.id === sourceList.id) return newSourceList;
      if (list.id === destinationList.id) return newDestinationList;
      return list;
    });
  };

  // ===============================================  
  // Main Functions
  // ===============================================

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'list') {
      const newLists = handleListReorder(lists, source, destination);
      setLists(newLists);
      return;
    }

    if (type === 'task') {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find((list) => list.id === destination.droppableId);

      if (sourceList === destinationList) {
        const newLists = handleTaskReorderSameList(lists, sourceList, source, destination);
        setLists(newLists);
      } else {
        const newLists = handleTaskMoveBetweenLists(lists, sourceList, destinationList, source, destination);
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
                      <AddCardorList type="forList" />
                    </div>
              {provided.placeholder}
              </div>
            )}
          </Droppable>
          </DragDropContext>

      </>
    </DataContext.Provider>
  );
};