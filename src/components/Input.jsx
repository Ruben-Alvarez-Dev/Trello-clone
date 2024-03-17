import React from 'react'
import { useState } from 'react';

export const Input = ({ type, list, setData, style="" }) => {
  
    const [showInput, setShowInput] = useState(false);

    const handleClose = (event) => {
        event.stopPropagation();
        
        const lists = JSON.parse(localStorage.getItem("lists"));
        
        const newList = lists.filter(item => item.title !== list.title);
        localStorage.setItem("lists", JSON.stringify(newList));

        setData(prevData => ({
            ...prevData,
            lists: newList,
          }));
    }
    const handleAdd = () => {
        setShowInput(true);
      };

    const toggleInput = (event) => {
        
        setShowInput(!showInput);
    }
    
      return (
    
    
    <div className={`addItem ${style}`}>
        
        {type === 'addTask' && (
            <>
                {
                    showInput && (
                        <input 
                            type="text"
                            placeholder="Enter a title for this card..." 
                            onBlur={toggleInput} />
                    )

                }
                <div className="buttons">
                    <h3 className="btn" onClick={handleAdd}>+</h3>
                    <h3 className="btn" onClick={handleClose}>x</h3>
                    <h3 className="btn">...</h3>
                </div>
            </>
        )}
        {type === 'addList' && (
            <>
                <div className="btn big">Add List ...</div>
                {/* <div className="btn" onClick={handleClose}>X</div>
                <div className="btn">...</div> */}
            </>
        )}
    
    </div>
  )
}
