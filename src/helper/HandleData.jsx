/**
 * Safely reads lists and tasks from localStorage.
 * Returns empty arrays if keys are missing or on parse error.
 * @returns {{lists: Array, tasks: Array}} Parsed data from storage
 */
export const readData = () => {
  const rawLists = localStorage.getItem('lists');
  const rawTasks = localStorage.getItem('tasks');

  let lists = [];
  let tasks = [];

  try {
    lists = rawLists ? JSON.parse(rawLists) : [];
  } catch (e) {
    console.error('Invalid lists JSON in localStorage. Resetting.', e);
    lists = [];
  }

  try {
    tasks = rawTasks ? JSON.parse(rawTasks) : [];
  } catch (e) {
    console.error('Invalid tasks JSON in localStorage. Resetting.', e);
    tasks = [];
  }

  return { lists, tasks };
}
