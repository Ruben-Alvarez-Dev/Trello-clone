import { createContext } from 'react'

/**
 * Task entity used throughout the application.
 * @typedef {Object} Task
 * @property {string} id - Unique identifier.
 * @property {string} value - Task content.
 * @property {string} [title] - Optional title (may mirror value).
 */

/**
 * List entity containing task ids.
 * @typedef {Object} List
 * @property {string} id - Unique identifier.
 * @property {string} title - List title.
 * @property {string[]} value - Array of task ids belonging to this list.
 */

/**
 * Shape of the DataContext value.
 * @typedef {Object} DataContextValue
 * @property {List[]} lists
 * @property {Function} setLists
 * @property {Task[]} tasks
 * @property {Function} setTasks
 */

/**
 * React context for sharing lists and tasks across components.
 * Provides centralized state management for the Trello clone application.
 */
export const DataContext = createContext()
