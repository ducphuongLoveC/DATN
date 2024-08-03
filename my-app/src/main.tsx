import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tippy.js/dist/tippy.css';
import 'react-circular-progressbar/dist/styles.css';
// import 'artplayer/dist/artplayer.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
