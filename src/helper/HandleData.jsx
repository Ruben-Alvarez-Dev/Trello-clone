export const readData = () => {
  
    let rawLists = localStorage.getItem('lists') || console.log('No lists found');
    let rawTasks = localStorage.getItem('tasks') || console.log('No tasks found');

    let lists = JSON.parse(rawLists);
    let tasks = JSON.parse(rawTasks);
    
    /* console.log(lists);
    console.log(tasks); */

    return { lists, tasks };
}
