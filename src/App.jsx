import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { fetchArtists } from './http/artistAPI.js';
import { fetchTypes } from './http/typeAPI.js';
import { check } from './http/userAPI.js';
import { TypesContext, UserContext } from './contexts.jsx';
import AppRouter from './components/AppRouter.jsx';
import NavBar from './components/NavBar.jsx';

export default observer(() => {
  const Types = useContext(TypesContext);
  const User = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      check()
        .then((data) => User.setInfo(data))
        .then(() => User.setIsAuth())
        .then(() => fetchArtists())
        .then((artists) => User.setArtists(artists))
        .catch(() => localStorage.clear())
        .then(() => fetchTypes())
        .then((types) => Types.setTypes(types))
        .finally(() => setLoading(false));
    } else {
      fetchTypes()
        .then((types) => Types.setTypes(types))
        .finally(() => setLoading(false));
    }
  }, [Types, User]);

  return loading ? (
    <div className="d-flex justify-content-center my-3">
      <Spinner animation="border" />
    </div>
  ) : (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});
