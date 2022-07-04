import React from 'react';
import Admin from './pages/Admin.jsx';
import Auth from './pages/Auth.jsx';
import ArtPage from './pages/ArtPage.jsx';
import Artist from './pages/Artist.jsx';
import Main from './pages/Main.jsx';
import Mark from './pages/Mark.jsx';
import {
  MAIN_ROUTE, MARK_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, ART_ROUTE, ARTIST_ROUTE, REGISTRATION_ROUTE,
} from './utils/consts.js';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
  {
    path: MARK_ROUTE,
    element: <Mark />,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    element: <Main />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
  {
    path: `${ART_ROUTE}/:id`,
    element: <ArtPage />,
  },
  {
    path: `${ARTIST_ROUTE}/:id`,
    element: <Artist />,
  },
];
