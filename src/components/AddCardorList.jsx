import React, { useState } from 'react';
import './AddCardorList.css';

export const AddCardorList = () => {
  
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  }
  return (
    
    <>
        {
          (showInput)
          ? <>
              <div onBlur={toggleInput} className="addCardorList">
                  <input type="text" placeholder="Enter list title..." />
                <div className="display">
                  <div className="btn">Add List</div>
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
