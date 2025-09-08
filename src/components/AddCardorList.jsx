import React, { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import './AddCardorList.css';
import { v4 } from 'uuid';
import { UI_STRINGS, CSS_CLASSES } from '../constants';

/**
 * AddCardorList component for adding new tasks or lists
 * Displays different UI based on type prop and handles form submission
 * @param {Object} props - Component props
 * @param {string} props.type - Type of item to add ('task' or 'list')
 * @param {string} [props.list=''] - List ID when adding tasks to specific list
 * @returns {JSX.Element} Form component for adding cards or lists
 */
/**
 * UI control to add a new task to a list or create a new list.
 * Renders the appropriate input based on the `type` prop.
 *
 * @param {Object} props
 * @param {('forTask'|'forList')} props.type - Selects task or list creation mode.
 * @param {List} [props.list] - Target list when adding a task.
 * @returns {JSX.Element}
 */
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
                    placeholder={UI_STRINGS.ENTER_TASK} 
                    value={inputValueTask}
                    autoFocus
                    onChange={(e) => setInputValueTask(e.target.value)}
                  />                      
                </form>
                <div className="button_bar">
                  <h3 onClick={addTaskInput}>{UI_STRINGS.NEW}</h3>
                  <h3 onClick={closeTaskInput}>{UI_STRINGS.CLOSE}</h3>
                </div>
              </div>
            ) : (
              <h3 onClick={openTaskInput}>{UI_STRINGS.ADD_TASK}</h3>
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
                    placeholder={UI_STRINGS.ENTER_LIST} 
                    value={inputValueList}
                    autoFocus
                    onChange={(e) => setInputValueList(e.target.value)}
                  />    
                </form>                  
                <div className="button_bar">
                  <h3 onClick={addListInput}>{UI_STRINGS.NEW}</h3>
                  <h3 onClick={closeListInput}>{UI_STRINGS.CLOSE}</h3>
                </div>
              </div>
            ) : (
              <h3 onClick={openListInput}>{UI_STRINGS.ADD_LIST}</h3>
            )}
          </div>
        </>
      )}
    </>
  );
};
