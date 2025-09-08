/**
 * Application configuration constants and UI-class namespaces.
 * @module constants/index
 */

/**
 * Application configuration values.
 * @namespace APP_CONFIG
 * @property {string} TITLE - Application title.
 * @property {Object} STORAGE_KEYS - Keys used in localStorage.
 * @property {string} STORAGE_KEYS.LISTS - localStorage key for lists.
 * @property {string} STORAGE_KEYS.TASKS - localStorage key for tasks.
 */
// Application configuration constants
export const APP_CONFIG = {
  TITLE: 'Trello Clone App',
  STORAGE_KEYS: {
    LISTS: 'lists',
    TASKS: 'tasks'
  }
};

/**
 * User interface strings for consistent copy across components.
 * @namespace UI_STRINGS
 * @property {string} ADD_TASK
 * @property {string} ADD_LIST
 * @property {string} ENTER_TASK
 * @property {string} ENTER_LIST
 * @property {string} NEW
 * @property {string} CLOSE
 * @property {string} REMOVE
 */
// User interface strings
export const UI_STRINGS = {
  ADD_TASK: 'Add a task',
  ADD_LIST: 'Add a list', 
  ENTER_TASK: 'Enter task...',
  ENTER_LIST: 'Enter list name...',
  NEW: 'New',
  CLOSE: 'Close',
  REMOVE: 'Remove'
};

/**
 * CSS class names grouped for reuse.
 * @namespace CSS_CLASSES
 * @property {string} INPUT_CONTAINER
 * @property {string} BUTTON_BAR
 * @property {string} INPUT
 * @property {string} TASK
 * @property {string} LIST
 * @property {string} FOR_TASK
 * @property {string} FOR_LIST
 */
// CSS class name constants
export const CSS_CLASSES = {
  INPUT_CONTAINER: 'input_container',
  BUTTON_BAR: 'button_bar',
  INPUT: 'input',
  TASK: 'task',
  LIST: 'list',
  FOR_TASK: 'forTask',
  FOR_LIST: 'forList'
};
