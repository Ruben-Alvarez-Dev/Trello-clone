import { useState, useEffect } from 'react';

/**
 * Custom hook for persistent localStorage state management
 * 
 * Provides stateful localStorage management with automatic synchronization
 * and error handling. Returns a stateful value and setter function similar
 * to React's useState, but with localStorage persistence.
 * 
 * @param {string} key - The localStorage key to use for persistence
 * @param {*} initialValue - Default value to use if localStorage is empty or invalid
 * @returns {[*, Function]} Array containing [storedValue, setValue] - similar to useState
 * 
 * @example
 * // Basic usage
 * const [name, setName] = useLocalStorage('userName', 'Anonymous');
 * 
 * @example  
 * // With objects/arrays
 * const [todos, setTodos] = useLocalStorage('todos', []);
 * 
 * @example
 * // Error handling is automatic
 * const [data, setData] = useLocalStorage('data', null);
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store the current value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Updates both the state and localStorage
   * @param {*} value - The new value to store
   */
  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};