import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Context } from './index.jsx';
import { fetchArtists } from './http/artistAPI.js';
import { check } from './http/userAPI.js';
import AppRouter from './components/AppRouter.jsx';
import NavBar from './components/NavBar.jsx';

export default observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      check()
        .then((data) => user.setInfo(data))
        .then(() => user.setIsAuth())
        .then(() => fetchArtists(User.id))
        .then((artists) => user.setArtists(artists))
        .catch(() => localStorage.clear())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return loading ? (
    <Spinner animation="grow" />
  ) : (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});
