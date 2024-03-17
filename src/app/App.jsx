import './App.css'
import { initData } from '../helper/InitData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
/* import { Input } from '../components/Input'; */
import { useState, useEffect } from 'react';
import { AddCardorList } from '../components/AddCardorList';

export const App = () => {

  const [data, setData] = useState({
    lists: initData().lists,
    tasks: initData().tasks,
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLists = localStorage.getItem('lists');
      if (storedLists) {
        const parsedLists = JSON.parse(storedLists);
        setData(prevData => ({
          ...prevData,
          lists: parsedLists,
        }));
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }


    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }


    if (type === 'task' && destination.droppableId === source.droppableId) {
      const list = data.lists.find(list => list.title === source.droppableId);
      const task = list.value.splice(source.index, 1)[0];
      list.value.splice(destination.index, 0, task);
    }


    if (type === 'task' && destination.droppableId !== source.droppableId) {
      const sourceList = data.lists.find(list => list.title === source.droppableId);
      const destinationList = data.lists.find(list => list.title === destination.droppableId);
      const task = sourceList.value.splice(source.index, 1)[0];
      destinationList.value.splice(destination.index, 0, task);
    }


    const movedList = data.lists.splice(source.index, 1)[0];
    data.lists.splice(destination.index, 0, movedList);

    localStorage.setItem('lists', JSON.stringify(data.lists));
    localStorage.setItem('tasks', JSON.stringify(data.tasks));
  }

  const handleRemoveTask = (e) => {
    e.stopPropagation();
    const task = data.tasks.find(task => task.value === e.target.previousSibling.textContent);
    const updatedLists = data.lists.map(list => {
      return {
        ...list,
        value: list.value.filter(item => item !== task.id)
      }
    });
    const updatedTasks = data.tasks.filter(item => item.id !== task.id);
    setData(prevData => ({
      ...prevData,
      lists: updatedLists,
      tasks: updatedTasks,
    }));
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  const handleRemoveList = (e) => {
    e.stopPropagation();
    const list = data.lists.find(list => list.title === e.target.previousSibling.textContent);
    const updatedLists = data.lists.filter(item => item.id !== list.id);
    const updatedTasks = data.tasks.filter(task => !list.value.includes(task.id));
    setData(prevData => ({
      ...prevData,
      lists: updatedLists,
      tasks: updatedTasks,
    }));
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  /*   const handleRemoveTask = (e) => {
    e.stopPropagation();
    const task = data.tasks.find(task => task.value === e.target.previousSibling.textContent);
    const lists = JSON.parse(localStorage.getItem("lists"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const newLists = lists.map(list => {
      return {
        ...list,
        value: list.value.filter(item => item !== task.id)
      }
    });
    const newTasks = tasks.filter(item => item.id !== task.id);
    localStorage.setItem("lists", JSON.stringify(newLists));
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setData(prevData => ({
      ...prevData,
      lists: newLists,
      tasks: newTasks,
    }));
  } */
  return (
    
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" direction="horizontal" type="list">
      {(provided) => (
        <div className="app" ref={provided.innerRef}
          {...provided.droppableProps}
          >
          {
            data.lists.map((list, index) => {
              return (

                <Draggable key={list.id} draggableId={list.id} index={index}>
                {(provided) => (
                    
                    <div className="list" ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                      <div className="title">
                        <div className="title-label">{list.title}</div>
                        <div className="title-remove" onClick={handleRemoveList}>rem</div>                        
                      </div>
                        <Droppable droppableId={list.title} type="task">
                        {(provided) => (
                          <div ref={provided.innerRef}
                          {...provided.droppableProps}
                          >
                            {
                              list.value.map((value, index) => {
                                return (
                                  <Draggable key={value} draggableId={value} index={index}>
                                    {(provided) => (
                                      <div className="task" ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="task-title">
                                          {data.tasks.find(task => task.id === value).value}
                                        </div>
                                        <div className="task-remove" onClick={handleRemoveTask}>
                                          rem
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                )
                              })
                            }
                          {provided.placeholder}
                          </div>
                        )}
                        </Droppable>
                      <AddCardorList type="forTask" list={list} setData={setData}/>

                      {/* <Input type={"addTask"} list={list} setData={setData}/> */}                            
                    </div>
                    
                  )}
                </Draggable>

                )
              })
            }
          {provided.placeholder}
          <AddCardorList type="forList" setData={setData}/>

          {/* <Input type={"addList"} style="inputList"/> */}                            
        </div>
      )}
      </Droppable>
      </DragDropContext>
  )
}
