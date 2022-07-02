import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import NavBar from './components/NavBar.js';
import AppRouter from './components/AppRouter.js';
import { Context } from './index.js';
import { check, fetchInfo } from './http/userAPI.js';

export default observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      check()
        .then((data) => {
          user.setInfo(data);
          user.setIsAuth();
          return fetchInfo(data.id);
        })
        .then(({ artists }) => user.setArtists(artists))
        .then(() => console.log(user))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (<Spinner animation={"grow"}/>);
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});
