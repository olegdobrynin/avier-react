import React, { useContext, useState } from 'react';
import {
  Navbar, Container, Nav, NavDropdown,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../contexts.jsx';
import CreateArt from './modals/CreateArt.jsx';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  MARK_ROUTE,
  REGISTRATION_ROUTE,
  USER_ARTIST_ROUTE,
  PROFILE_ROUTE,
} from '../utils/consts.js';

export default observer(() => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const [artVisible, setArtVisible] = useState(false);

  const logOut = () => {
    User.clear();
    localStorage.clear();
    navigate(MAIN_ROUTE);
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Nav.Link tabIndex="0" onClick={() => navigate(MAIN_ROUTE)}>
            <img
              src="/logo330x100.png"
              width="132"
              height="40"
              className="d-inline-block align-top"
              alt="Avier"
            />
          </Nav.Link>
        </Navbar.Brand>

        {User.isAuth ? (
          <Nav className="ml-auto">
            <NavDropdown
              className="ml-auto"
              id="nav-dropdown"
              align="end"
              title={User.login}
              menuVariant="white"
            >
              {User.role === 'admin' && (
                <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>Админ</NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => navigate(USER_ARTIST_ROUTE)}>
                Художники
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate(MARK_ROUTE)}>Закладки</NavDropdown.Item>

              {User.artists.length > 0 && (
                <NavDropdown.Item onClick={() => setArtVisible(true)}>
                  Добавить арт
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate(PROFILE_ROUTE)}>Настройки</NavDropdown.Item>
              <NavDropdown.Item onClick={() => logOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
            <CreateArt show={artVisible} onHide={() => setArtVisible(false)} />
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</Nav.Link>
            <Nav.Link onClick={() => navigate(LOGIN_ROUTE)}>Войти</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
