import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Context } from './index.jsx';
import NavBar from './components/NavBar.jsx';
import AppRouter from './components/AppRouter.jsx';
import { check, fetchInfo } from './http/userAPI.js';

export default observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      check()
        .then((data) => user.setInfo(data))
        .then(() => fetchInfo(user.info.id))
        .then(({ artists }) => user.setArtists(artists))
        .then(() => user.setIsAuth())
        .catch(() => localStorage.clear())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return loading
    ? (<Spinner animation={"grow"}/>)
    : (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    );
});
