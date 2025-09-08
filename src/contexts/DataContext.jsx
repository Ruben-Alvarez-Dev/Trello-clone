import { createContext } from 'react'

/**
 * React context for sharing lists and tasks data across components
 * Provides centralized state management for the Trello clone application
 * @context DataContext
 * @property {Array} lists - Array of list objects containing id, title, and value (task IDs)
 * @property {Function} setLists - Function to update the lists state
 * @property {Array} tasks - Array of task objects containing id, value, and other properties
 * @property {Function} setTasks - Function to update the tasks state
 */
export const DataContext = createContext()
