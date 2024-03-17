import React, { useState } from 'react';
import './AddCardorList.css';
import { v4 } from 'uuid';

export const AddCardorList = ({ list, setData }) => {
  
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleInput = () => {
    setShowInput(!showInput);
  }
  
  const handleAddTask = () => {
    
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

  }
  return (
    
    <>
        {
          (showInput)
          ? <>
              <div onBlur={toggleInput} className="addCardorList">
                  <input 
                    type="text" 
                    placeholder="Enter task..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                <div className="display">
                  <div className="btn" onClick={handleAddTask}>Add List</div>
                  <div className="btn" onClick={toggleInput}>Close</div>
                </div>
              </div>
            </>

          : <>
              <div className="addCardorList">
                <div className="display">
                  <div className="btn" onClick={toggleInput}>+</div>
                  <div className="btn">x</div>
                  <div className="btn">...</div>
                </div>
                
              </div>
            </>

        }
      


    </>
  )
}
