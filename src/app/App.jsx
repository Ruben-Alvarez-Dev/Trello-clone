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
 * Main Trello Clone application component.
 * Manages global state and drag-and-drop behavior for lists and tasks.
 * @returns {JSX.Element}
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
   * Handle reordering lists horizontally.
   * @param {ListEntity[]} lists
   * @param {{index:number}} source
   * @param {{index:number}} destination
   * @returns {List[]}
   */
  const handleListReorder = (lists, source, destination) => {
    const newLists = Array.from(lists);
    const [removedList] = newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, removedList);
    return newLists;
  };

  /**
   * Handle reordering tasks within the same list.
   * @param {ListEntity[]} lists
   * @param {ListEntity} sourceList
   * @param {{index:number}} source
   * @param {{index:number}} destination
   * @returns {List[]}
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
   * Handle moving tasks between different lists.
   * @param {ListEntity[]} lists
   * @param {ListEntity} sourceList
   * @param {ListEntity} destinationList
   * @param {{index:number}} source
   * @param {{index:number}} destination
   * @returns {List[]}
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
   * Main drag-and-drop handler from react-beautiful-dnd.
   * @param {Object} result
   * @param {Object} [result.destination]
   * @param {Object} result.source
   * @param {string} result.type
   * @returns {void}
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
