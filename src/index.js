import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.js';
import UserStore from './store/UserStore.js';
import ArtStore from './store/ArtStore.js';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    art: new ArtStore(),
  }}>
    <App />
  </Context.Provider>
);
