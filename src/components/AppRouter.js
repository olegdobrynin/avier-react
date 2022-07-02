import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index.js';
import { authRoutes, publicRoutes } from '../routes.js';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts.js';

export default observer(() => {
  const { user } = useContext(Context);

  const getRoutes = () => user.isAuth
    ? [...authRoutes, ...publicRoutes]
      .filter(({ path }) => path !== REGISTRATION_ROUTE && path !== LOGIN_ROUTE)
      .map(({ path, element }) => (<Route key={path} path={path} element={element} end />))
    : publicRoutes
      .map(({ path, element }) => (<Route key={path} path={path} element={element} end />));

  return (
    <Routes>
      {getRoutes()}
      <Route path="*" element={<Navigate to ={MAIN_ROUTE} />}/>
    </Routes>
  );
});
