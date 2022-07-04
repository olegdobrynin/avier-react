import { observer } from 'mobx-react-lite';
import React , { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../index.jsx';
import { auth, fetchInfo, registration } from '../http/userAPI.js';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts.js';

export default observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      const data = isLogin
        ? await auth(login, password)
        : await registration(login, password);

      user.setIsAuth();
      user.setInfo(data);
      const info = await fetchInfo(data.id);
      user.setArtists(info.artists);
      navigate(MAIN_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleKeyPress = (target) => target.charCode === 13
    ? click()
    : null;

  return (
    <Container className='d-flex justify-content-center align-item-center py-5'>
      <Card className='p-3' style={{maxWidth:600, width: document.documentElement.clientWidth}}>
        <Form className='d-flex flex-column'>
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин.."
              autoComplete="username"
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
          <Button className='mt-3' variant={'primary'} onClick={click}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
});
