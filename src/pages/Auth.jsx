import React, { useContext, useState } from 'react';
import {
  Alert, Button, Card, Container, Form,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { fetchArtists } from '../http/artistAPI.js';
import { auth, registration } from '../http/userAPI.js';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const click = async () => {
    try {
      const { id, role } = isLogin
        ? await auth(login, password)
        : await registration(login, password);

      setLogin('');
      setPassword('');
      User.setIsAuth();
      User.setInfo({ id, login, role });
      const artists = await fetchArtists(id);
      User.setArtists(artists);
      navigate(MAIN_ROUTE);
    } catch (e) {
      setMessage(e.response.data.message);
    }
  };

  const handleKeyPress = (target) => (target.charCode === 13 ? click() : null);

  return (
    <Container className="d-flex justify-content-center align-item-center py-5">
      <Card className="p-3" style={{ maxWidth: 600, width: document.documentElement.clientWidth }}>
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин.."
              autoComplete="username"
              autoFocus
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль.."
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Form.Group>
          {message && (
            <Alert key="danger" variant="danger">
              {message}
            </Alert>
          )}

          <Button className="mt-3" variant="primary" onClick={click}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
});
