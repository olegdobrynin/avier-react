import React from 'react';
import {
  MAIN_ROUTE,
  MARK_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  ART_ROUTE,
  ARTIST_ROUTE,
  REGISTRATION_ROUTE,
  USER_ARTIST_ROUTE,
  PROFILE_ROUTE,
} from './utils/consts.js';
import Admin from './pages/Admin.jsx';
import ArtPage from './pages/ArtPage.jsx';
import Artist from './pages/Artist.jsx';
import Auth from './pages/Auth.jsx';
import Main from './pages/Main.jsx';
import Mark from './pages/Mark.jsx';
import Profile from './pages/Profile.jsx';
import UserArtists from './pages/UserArtists.jsx';

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
];

export const artistRoutes = [
  {
    path: USER_ARTIST_ROUTE,
    element: <UserArtists />,
  },
];

export const authRoutes = [
  {
    path: MARK_ROUTE,
    element: <Mark />,
  },
  {
    path: PROFILE_ROUTE,
    element: <Profile />,
  },
];

export const unAuthRoutes = [
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    element: <Main />,
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
