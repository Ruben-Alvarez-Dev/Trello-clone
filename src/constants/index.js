/**
 * @fileoverview Application constants for centralized configuration
 * Contains all hardcoded strings, configuration values, and CSS class names
 * used throughout the Trello Clone application.
 */

/**
 * Main application configuration constants
 * @namespace APP_CONFIG
 */
export const APP_CONFIG = {
  /** @type {string} Main application title */
  TITLE: 'Trello Clone App',
  
  /** 
   * localStorage keys used for data persistence
   * @namespace STORAGE_KEYS
   */
  STORAGE_KEYS: {
    /** @type {string} Key for storing lists data */
    LISTS: 'lists',
    /** @type {string} Key for storing tasks data */
    TASKS: 'tasks'
  }
};

/**
 * User interface strings for consistent text across components
 * Centralized for easy maintenance and potential i18n support
 * @namespace UI_STRINGS
 */
export const UI_STRINGS = {
  /** @type {string} Text for add task button */
  ADD_TASK: 'Add a task',
  /** @type {string} Text for add list button */
  ADD_LIST: 'Add a list', 
  /** @type {string} Placeholder for task input field */
  ENTER_TASK: 'Enter task...',
  /** @type {string} Placeholder for list name input field */
  ENTER_LIST: 'Enter list name...',
  /** @type {string} Text for new/create button */
  NEW: 'New',
  /** @type {string} Text for close button */
  CLOSE: 'Close',
  /** @type {string} Alt text for remove/delete button */
  REMOVE: 'Remove'
};

/**
 * CSS class name constants to prevent typos and enable IDE autocomplete
 * @namespace CSS_CLASSES
 */
export const CSS_CLASSES = {
  /** @type {string} Class for input container wrapper */
  INPUT_CONTAINER: 'input_container',
  /** @type {string} Class for button bar container */
  BUTTON_BAR: 'button_bar',
  /** @type {string} Class for input fields */
  INPUT: 'input',
  /** @type {string} Class for task components */
  TASK: 'task',
  /** @type {string} Class for list components */
  LIST: 'list',
  /** @type {string} Class for task-related forms */
  FOR_TASK: 'forTask',
  /** @type {string} Class for list-related forms */
  FOR_LIST: 'forList'
};