import './App.css';
import React, { useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { List } from '../components/List';

export const App = () => {

  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Cargar los datos de localStorage al iniciar la aplicación
    const storedLists = localStorage.getItem('lists');
    const storedTasks = localStorage.getItem('tasks');

    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Guardar los datos en localStorage cada vez que cambien
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [lists, tasks]);


  return (
    <DataContext.Provider value={{ lists, setLists, tasks, setTasks }}>
      <>
        <h1>Trello Clon App</h1>
          <div className="app">
          {
            lists.map((list, index) => (
              <List key={list.id} list={list} index={index}/>
            ))
          }
          </div>
      </>
    </DataContext.Provider>
  );


}

