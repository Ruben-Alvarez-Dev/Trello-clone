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
  const openListInput = (e) => {
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
  const closeListInput = (e) => {
    const parent = e.target.parentElement.parentElement.parentElement;
    parent.children[1].style.display = 'flex';
    parent.children[0].style.display = 'none';
  }
  const addTaskInput = () => {
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
      
      setInputValueTask('');
      setData(prevData => ({
        ...prevData,
        lists: updatedLists,
        tasks: updatedTasks,
      }));
    } else {
      setInputValueTask('');
      
    }
  }
  const addListInput = (e) => {
    
    if (inputValueList) {
      localStorage.getItem('lists');
      const storedLists = localStorage.getItem('lists');
      const parsedLists = JSON.parse(storedLists);
      const newList = {
        id: v4(),
        title: inputValueList,
        value: [],
      };
      const updatedLists = [...parsedLists, newList];
      localStorage.setItem('lists', JSON.stringify(updatedLists));
      setInputValueList('');
      setData(prevData => ({
        ...prevData,
        lists: updatedLists,
      }));
      closeListInput(e);

    } else {
      setInputValueList('');
      closeListInput(e);
  
    }
  }
  const handleBlur = (e) => {
    const current = e.target;
    const parent = e.target.parentElement.parentElement;
    parent.children[1].style.display = 'flex';
    parent.children[0].style.display = 'none';
    setInputValueTask('');
    setInputValueList('');

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

  
  return (
    
    <>
        {
          type === "forTask" && (
            <>
              <div className="forTask">
                  <div onBlur={handleBlur} className="input_container">
                        <input
                          className="input" 
                          type="text" 
                          placeholder="Enter task..." 
                          value={inputValueTask}
                          autoFocus
                          onChange={(e) => setInputValueTask(e.target.value)}
                          
                        />                      
                        <div className="button_bar">
                          <h3 onClick={addTaskInput}>New</h3>
                          <h3 onClick={closeTaskInput}>Close</h3>
                      </div>
                  </div>
                <h3 onClick={openTaskInput}>Add a task</h3>
              </div>
            </>
          )
        }
        {
          type === "forList" && (
            <>
            <div className="forList">
                  <div className="input_container">
                        <input
                          className="input" 
                          type="text" 
                          placeholder="Enter task..." 
                          value={inputValueList}
                          autoFocus
                          onChange={(e) => setInputValueList(e.target.value)}
                        />                      
                        <div className="button_bar">
                          <h3 onClick={addListInput}>New</h3>
                          <h3 onClick={closeTaskInput}>Close</h3>
                      </div>
                  </div>
                <h3 onClick={openListInput}>Add a list</h3>
              </div>
            </>
          )
        }

    </>
  )
}
