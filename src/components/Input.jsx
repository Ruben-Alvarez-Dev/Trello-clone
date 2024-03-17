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
    return (
    
    
    <div className={`input ${style}`}>
        
        {type === 'addTask' && (
            <>
                {
                    showInput && (
                        <input type="text" placeholder="Enter a title for this card..." />
                    )

                }
                <div>
                    <div className="btn big" onClick={handleAdd}>Add Task ...</div>
                    <div className="btn" onClick={handleClose}>X</div>
                    <div className="btn">...</div>
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
