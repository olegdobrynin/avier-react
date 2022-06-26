import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check, fetchInfo } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

export default observer( function App() {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    check().then( async (data) => {
      user.setUserInfo(data)
      user.setUser(user)
      user.setIsAuth(true)
      let info = await fetchInfo(data.id);
      user.setArtists(info.artists)

    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})
