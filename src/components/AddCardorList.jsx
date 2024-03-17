import React, { useState } from 'react';
import './AddCardorList.css';

export const AddCardorList = () => {
  
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleInput = () => {
    setShowInput(!showInput);
  }

  const handleAddTask = () => {
    console.log(inputValue);
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
