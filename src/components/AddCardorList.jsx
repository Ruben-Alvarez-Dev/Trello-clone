import React, { useState } from 'react';
import './AddCardorList.css';
import { v4 } from 'uuid';

export const AddCardorList = ({ type, list, setData }) => {
  
  const [showInput, setShowInput] = useState(false);
  const [inputValueTask, setInputValueTask] = useState('');
  const [inputValueList, setInputValueList] = useState('');

  const openTaskInput = (e) => {
    const current = e.target;
    const parent = e.target.parentElement;
    parent.children[0].style.display = 'flex';
    parent.children[0].style.flexDirection = 'column';
    parent.children[1].style.display = 'none';
  }
  const closeTaskInput = (e) => {
    const current = e.target;
    const parent = e.target.parentElement.parentElement.parentElement;
    parent.children[1].style.display = 'flex';
    parent.children[0].style.display = 'none';
  }
  const addTaskInput = (e) => {}
  const openlistInput = (e) => {}

  const handleAddTask = () => {

        
    if (list && inputValueTask) {

      localStorage.getItem('tasks');
      const storedTasks = localStorage.getItem('tasks');
      const parsedTasks = JSON.parse(storedTasks);
      const newTask = {
        id: v4(),
        title: inputValueTask,
        value: inputValueTask,
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
      setInputValueTask('');
      setData(prevData => ({
        ...prevData,
        lists: updatedLists,
        tasks: updatedTasks,
      }));
    } else {
      setInputValueTask('');
      toggleInput();
    }
  }
  const handleBlur = () => {
    if (inputValueTask || inputValueList) {
      setInputValueList('');
      setInputValueTask('');
      toggleInput();
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
  const handleAddList = () => {
    
    alert('handleAddList');

    /* const storedLists = localStorage.getItem('lists');
    const parsedLists = JSON.parse(storedLists);
    console.log(parsedLists);
    console.log(inputValueList); */

    
  }
  
  return (
    
    <>
        {
          type === "forTask" && (
            <>
              <div className="forTask">
                {/* {
                  showInput && (
                    <div>
                      <input />
                      <h2 onClick={toggleInput}>nuevo</h2>
                    </div>
                  )
                } */}
                  <div className="input_container">
                    <input className='input'/>
                      <div className="button_bar">
                        <h3 onClick={addTaskInput}>New</h3>
                        <h3 onClick={closeTaskInput}>Close</h3>
                      </div>
                  </div>
                <h3 onClick={openTaskInput}>Task</h3>
              </div>
            </>
          )
        }
        {
          type === "forList" && (
            <>
              {
                showInput && (<input />)
              }
              <h1 className="toggle" onClick={openlistInput}>List</h1>
            </>
          )
        }

        {/* {showInput && type === "forTask" && (
          
          <>
            <div onBlur={handleBlur} className="addCardorList">
                <input 
                  type="text" 
                  placeholder="Enter task..." 
                  value={inputValueTask}
                  autoFocus
                  onChange={(e) => setInputValueTask(e.target.value)}
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
            <div onBlur={handleBlur} className="addCardorList out">
                <input 
                  type="text" 
                  placeholder="Enter List..." 
                  value={inputValueList}
                  autoFocus
                  onChange={(e) => setInputValueList(e.target.value)}
                />
              <div className="display">
                <div className="btn" onClick={handleAddList}>XXX Add List</div>
                <button onClick={handleAddList}>Add List</button>
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
            <div className="addCardorList out">
              <div className="display">
                <div className="btn" onClick={toggleInput}>+ Add List</div>
                <div className="btn">...</div>
              </div>
            </div>
          </>

        )} */}
    </>
  )
}
