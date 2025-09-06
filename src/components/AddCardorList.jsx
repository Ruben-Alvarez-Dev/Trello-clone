import React, { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import './AddCardorList.css';
import { v4 } from 'uuid';

export const AddCardorList = ({ type, list = '' }) => {
  
  // Accessing data from the DataContext
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);

  // State variables for input values
  const [inputValueTask, setInputValueTask] = useState('');
  const [inputValueList, setInputValueList] = useState('');
  
  // State variables for input visibility (replaces DOM manipulation)
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [showListInput, setShowListInput] = useState(false);

  // Functions to control input visibility with React state
  const openTaskInput = () => {
    setShowTaskInput(true);
  };

  const openListInput = () => {
    setShowListInput(true);
  };

  const closeTaskInput = () => {
    setShowTaskInput(false);
    setInputValueTask('');
  };

  const closeListInput = () => {
    setShowListInput(false);
    setInputValueList('');
  };

  // Function to add a new task
  const addTaskInput = (e) => {
    e.preventDefault();
    if (list && inputValueTask) {
      const newTask = {
        id: v4(),
        title: inputValueTask,
        value: inputValueTask,
      };

      const updatedLists = lists.map((l) => {
        if (l.id === list.id) {
          return {
            ...l,
            value: [...l.value, newTask.id],
          };
        }
        return l;
      });

      setLists(updatedLists);
      setTasks([...tasks, newTask]);
      setInputValueTask('');
      setShowTaskInput(false);
    } else {
      setInputValueTask('');
    }
  };

  // Function to add a new list
  const addListInput = (e) => {
    e.preventDefault();
    if (inputValueList) {
      const newList = {
        id: v4(),
        title: inputValueList,
        value: [],
      };
      
      const updatedLists = [...lists];
      updatedLists.push(newList);
      setLists(updatedLists);
      setInputValueList('');
      setShowListInput(false);
    } else {
      setInputValueList('');
      setShowListInput(false);
    }
  };

  // Function to handle blur event (simplified)
  const handleBlur = () => {
    setShowTaskInput(false);
    setShowListInput(false);
    setInputValueTask('');
    setInputValueList('');
  };

  return (
    <>
      {/* Render the component based on the type */}
      {type === "forTask" && (
        <>
          <div className="forTask">
            {showTaskInput ? (
              <div onBlur={handleBlur} className="input_container">
                <form id="taskInputForm" onSubmit={addTaskInput}>
                  <input
                    className="input" 
                    type="text" 
                    placeholder="Enter task..." 
                    value={inputValueTask}
                    autoFocus
                    onChange={(e) => setInputValueTask(e.target.value)}
                  />                      
                </form>
                <div className="button_bar">
                  <h3 onClick={addTaskInput}>New</h3>
                  <h3 onClick={closeTaskInput}>Close</h3>
                </div>
              </div>
            ) : (
              <h3 onClick={openTaskInput}>Add a task</h3>
            )}
          </div>
        </>
      )}

      {type === "forList" && (
        <>
          <div className="forList">
            {showListInput ? (
              <div className="input_container">
                <form id="listInputForm" onSubmit={addListInput}>
                  <input
                    className="input" 
                    type="text" 
                    placeholder="Enter list name..." 
                    value={inputValueList}
                    autoFocus
                    onChange={(e) => setInputValueList(e.target.value)}
                  />    
                </form>                  
                <div className="button_bar">
                  <h3 onClick={addListInput}>New</h3>
                  <h3 onClick={closeListInput}>Close</h3>
                </div>
              </div>
            ) : (
              <h3 onClick={openListInput}>Add a list</h3>
            )}
          </div>
        </>
      )}
    </>
  );
};