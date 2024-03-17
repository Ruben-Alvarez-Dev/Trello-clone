import React, { useState } from 'react';
import './AddCardorList.css';
import { v4 } from 'uuid';

export const AddCardorList = ({ type, list, setData }) => {
  
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleInput = () => {
    setShowInput(!showInput);
  }
  const handleAddTask = () => {

        
    if (list && inputValue) {

      localStorage.getItem('tasks');
      const storedTasks = localStorage.getItem('tasks');
      const parsedTasks = JSON.parse(storedTasks);
      const newTask = {
        id: v4(),
        title: inputValue,
        value: inputValue,
      };
      const updatedTasks = [...parsedTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      localStorage.getItem('lists');
      const storedLists = localStorage.getItem('lists');
      const parsedLists = JSON.parse(storedLists);
      const listIndex = parsedLists.findIndex(l => l.id === list.id);
      const updatedList = {
        ...parsedLists[listIndex],
        value: [...parsedLists[listIndex].value, newTask.id],
      };
      const updatedLists = [
        ...parsedLists.slice(0, listIndex),
        updatedList,
        ...parsedLists.slice(listIndex + 1),
      ];
      localStorage.setItem('lists', JSON.stringify(updatedLists));
      toggleInput();
      setInputValue('');
      setData(prevData => ({
        ...prevData,
        lists: updatedLists,
        tasks: updatedTasks,
      }));
    } else {
      setInputValue('');
      toggleInput();
    }
  }
  const handleBlur = () => {
    if (inputValue) {
      handleAddTask();
    } else {
      toggleInput();
    }
  }
  const handleRemoveList = (event) => {
    event.stopPropagation();
    
    const lists = JSON.parse(localStorage.getItem("lists"));
    
    const newList = lists.filter(item => item.title !== list.title);
    localStorage.setItem("lists", JSON.stringify(newList));

    setData(prevData => ({
        ...prevData,
        lists: newList,
      }));
}
  const handleAddList = () => {}
  
  return (
    
    <>
        {showInput && type === "forTask" && (
          
          <>
            <div onBlur={handleBlur} className="addCardorList">
                <input 
                  type="text" 
                  placeholder="Enter task..." 
                  value={inputValue}
                  autoFocus
                  onChange={(e) => setInputValue(e.target.value)}
                />
              <div className="display">
                <div className="btn" onClick={handleAddTask}>Add Task</div>
                <div className="btn" onClick={toggleInput}>Close</div>
              </div>
            </div>
          </>

        )}
        {showInput && type === "forList" && (
          
          <>
            <div onBlur={handleBlur} className="addCardorList">
                <input 
                  type="text" 
                  placeholder="Enter task..." 
                  value={inputValue}
                  autoFocus
                  onChange={(e) => setInputValue(e.target.value)}
                />
              <div className="display">
                <div className="btn" onClick={handleAddList}>Add List</div>
                <div className="btn" onClick={toggleInput}>Close</div>
              </div>
            </div>
          </>

        )}
        {!showInput && type === "forTask" && (
          
          <>
            <div className="addCardorList">
              <div className="display">
                <div className="btn" onClick={toggleInput}>+</div>
                <div className="btn" onClick={handleRemoveList}>x</div>
                <div className="btn">...</div>
              </div>
            </div>
          </>

        )}
        {!showInput && type === "forList" && (
          
          
          <>
            <div className="addCardorList">
              <div className="display">
                <div className="btn" onClick={toggleInput}>+ Add List</div>
                <div className="btn">...</div>
              </div>
            </div>
          </>

        )}
        
        {/* {
          (showInput)
          ? ((type === "forTask")
            ?
                <>
                  <div onBlur={handleBlur} className="addCardorList">
                      <input 
                        type="text" 
                        placeholder="Enter task..." 
                        value={inputValue}
                        autoFocus
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    <div className="display">
                      <div className="btn" onClick={handleAddTask}>Add List</div>
                      <div className="btn" onClick={toggleInput}>Close</div>
                    </div>
                  </div>
                </>
            : 
                <>
                  <div className="addCardorList">
                    <div className="display">
                      <div className="btn" onClick={toggleInput}>+ Add List</div>
                      <div className="btn">...</div>
                    </div>
                  </div>
                </>
            )
          : 
            <>
              <div className="addCardorList">
                <div className="display">
                  <div className="btn" onClick={toggleInput}>+</div>
                  <div className="btn" onClick={handleRemoveList}>x</div>
                  <div className="btn">...</div>
                </div>
              </div>
            </>
        } */}
      


    </>
  )
}
