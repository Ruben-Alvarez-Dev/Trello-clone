import { createContext } from 'react'

/**
 * Task entity used throughout the application.
 * @typedef {Object} TaskEntity
 * @property {string} id - Unique identifier.
 * @property {string} value - Task content.
 * @property {string} [title] - Optional title (may mirror value).
 */

/**
 * List entity containing task ids.
 * @typedef {Object} ListEntity
 * @property {string} id - Unique identifier.
 * @property {string} title - List title.
 * @property {string[]} value - Array of task ids belonging to this list.
 */

/**
 * Shape of the DataContext value.
 * @typedef {Object} DataContextValue
 * @property {ListEntity[]} lists
 * @property {Function} setLists
 * @property {TaskEntity[]} tasks
 * @property {Function} setTasks
 */

/**
 * React context for sharing lists and tasks across components.
 * Provides centralized state management for the Trello clone application.
 */
export const DataContext = createContext()
