import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { initData } from '../helper/InitData.jsx'


initData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
