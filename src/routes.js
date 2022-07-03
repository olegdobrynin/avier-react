import React from 'react';
import Admin from './pages/Admin.js';
import Auth from './pages/Auth.js';
import ArtPage from './pages/ArtPage.js';
import Artist from './pages/Artist.js';
import Main from './pages/Main.js';
import Mark from './pages/Mark.js';
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
    element: <Mark />
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    element: <Main />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />
  },
  {
    path: `${ART_ROUTE}/:id`,
    element: <ArtPage />
  },
  {
    path: `${ARTIST_ROUTE}/:id`,
    element: <Artist />
  },
];
