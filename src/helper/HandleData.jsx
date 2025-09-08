/**
 * Safely reads lists and tasks from localStorage.
 * Returns empty arrays if keys are missing or on parse error.
 * @returns {{lists: Array, tasks: Array}} Parsed data from storage
 */
export const readData = () => {
  
    let rawLists = localStorage.getItem('lists') || console.log('No lists found');
    let rawTasks = localStorage.getItem('tasks') || console.log('No tasks found');

    let lists = [];
    let tasks = [];
    try {
      lists = JSON.parse(rawLists);
      tasks = JSON.parse(rawTasks);
    } catch (e) {
      console.error('Invalid JSON in localStorage. Resetting.', e);
      lists = [];
      tasks = [];
    }
    
    /* console.log(lists);
    console.log(tasks); */

    return { lists, tasks };
}
