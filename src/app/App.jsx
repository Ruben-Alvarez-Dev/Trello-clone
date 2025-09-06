import './App.css';
import React, { useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { List } from '../components/List';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AddCardorList } from '../components/AddCardorList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { APP_CONFIG } from '../constants';
import { initData } from '../helper/InitData';

/**
 * Main Trello Clone application component
 * Manages global state and drag-and-drop functionality for lists and tasks
 * @returns {JSX.Element} The main app component with drag-drop context
 */
export const App = () => {

  // ===============================================
  // State Management with localStorage persistence
  // ===============================================
  
  const [lists, setLists] = useLocalStorage(APP_CONFIG.STORAGE_KEYS.LISTS, []);
  const [tasks, setTasks] = useLocalStorage(APP_CONFIG.STORAGE_KEYS.TASKS, []);

  // Initialize default data if localStorage is empty
  useEffect(() => {
    if (lists.length === 0 && tasks.length === 0) {
      initData();
      // Force reload data after initialization
      const storedLists = JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_KEYS.LISTS) || '[]');
      const storedTasks = JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_KEYS.TASKS) || '[]');
      setLists(storedLists);
      setTasks(storedTasks);
    }
  }, []);

  // ===============================================  
  // Drag and Drop Helper Functions
  // ===============================================

  /**
   * Handles horizontal reordering of lists
   * @param {Array} lists - Current lists array
   * @param {Object} source - Source position from drag event
   * @param {Object} destination - Destination position from drag event
   * @returns {Array} New lists array with updated order
   */
  const handleListReorder = (lists, source, destination) => {
    const newLists = Array.from(lists);
    const [removedList] = newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, removedList);
    return newLists;
  };

  /**
   * Handles reordering tasks within the same list
   * @param {Array} lists - Current lists array
   * @param {Object} sourceList - The list containing the task being moved
   * @param {Object} source - Source position from drag event
   * @param {Object} destination - Destination position from drag event
   * @returns {Array} Updated lists array with reordered tasks
   */
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

  /**
   * Handles moving tasks between different lists
   * @param {Array} lists - Current lists array
   * @param {Object} sourceList - Source list containing the task
   * @param {Object} destinationList - Destination list to receive the task
   * @param {Object} source - Source position from drag event
   * @param {Object} destination - Destination position from drag event
   * @returns {Array} Updated lists array with task moved between lists
   */
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

  /**
   * Main drag-and-drop event handler
   * Routes drag events to appropriate handler functions based on type
   * @param {Object} result - Drag result object from react-beautiful-dnd
   * @param {Object} result.destination - Drop destination
   * @param {Object} result.source - Drag source
   * @param {string} result.type - Type of item being dragged ('list' or 'task')
   */
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
        <h1>{APP_CONFIG.TITLE}</h1>

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