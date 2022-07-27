import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';
import {
  adminRoutes, artistRoutes, authRoutes, publicRoutes, unAuthRoutes,
} from '../routes.jsx';

export default observer(() => {
  const User = useContext(UserContext);

  const getRoutes = () => {
    switch (User.role) {
      case 'admin':
        return [...adminRoutes, ...artistRoutes, ...authRoutes, ...publicRoutes].map(
          ({ path, element }) => <Route key={path} path={path} element={element} end />,
        );
      case 'artist':
        return [...artistRoutes, ...authRoutes, ...publicRoutes].map(({ path, element }) => (
          <Route key={path} path={path} element={element} end />
        ));
      case 'user':
        return [...authRoutes, ...publicRoutes].map(({ path, element }) => (
          <Route key={path} path={path} element={element} end />
        ));
      default:
        return [...unAuthRoutes, ...publicRoutes].map(({ path, element }) => (
          <Route key={path} path={path} element={element} end />
        ));
    }
  };

  return (
    <Routes>
      {getRoutes()}
      <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
    </Routes>
  );
});
