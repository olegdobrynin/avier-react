import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index.jsx';
import CreateArt from './modals/CreateArt.jsx';
import {
  ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USER_ARTIST_ROUTE, PROFILE_ROUTE
} from '../utils/consts.js';

export default observer(() => {
  const navigate = useNavigate();
  const { art, user } = useContext(Context);
  const [artVisible, setArtVisible] = useState(false);

  const logOut = () => {
    user.clear();
    localStorage.clear();
    navigate(MAIN_ROUTE);
  };

  const logo = () => {
    art.setSelectedType();
    navigate(MAIN_ROUTE);
  };

  return (
    <Navbar bg="light" variant="light" >
      <Container>
        <Navbar.Brand onClick={() => logo() }>
          <img
            src="/logo330x100.png"
            width="132"
            height="40"
            className="d-inline-block align-top"
            alt="Avier"
          />
        </Navbar.Brand>

        {user.isAuth ? (
          <Nav className="ml-auto">
            <NavDropdown
              className="ml-auto"
              id="nav-dropdown"
              title={user.info.login}
              menuVariant="white"
            >
              {(user.info.role !== 'admin') || (<NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>Админ</NavDropdown.Item>)}
              <NavDropdown.Item onClick={() => navigate(USER_ARTIST_ROUTE)}>Художники</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setArtVisible(true)}>Добавить арт</NavDropdown.Item>
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
