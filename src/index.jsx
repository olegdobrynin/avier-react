import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TypesStore from './store/TypesStore.js';
import UserStore from './store/UserStore.js';
import { TypesContext, UserContext } from './contexts.jsx';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TypesContext.Provider value={new TypesStore()}>
    <UserContext.Provider value={new UserStore()}>
      <App />
    </UserContext.Provider>
  </TypesContext.Provider>,
);
