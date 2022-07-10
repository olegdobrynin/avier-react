import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { auth, deleteUser } from '../../http/userAPI.js';
import { MAIN_ROUTE } from '../../utils/consts.js';
import { UserContext } from '../../contexts.jsx';

export default observer(({ show, onHide }) => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const { id, login } = User;
  const [password, setPassword] = useState('');

  const delUser = () => auth(login, password)
    .then(() => deleteUser(id))
    .then(() => {
      User.clear();
      localStorage.clear();
      navigate(MAIN_ROUTE);
    })
    .catch((e) => alert(e.response.data.message));

  const handleKeyPress = (target) => (target.charCode === 13 ? delUser() : null);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Вы уверены?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="password">
          <Form.Label>Внимание! Данное действие необратимо!</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            placeholder="Для удаления пользователя введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Form.Text>
            Перед удалением убедитесь в том, что у пользователя не осталось художников. Вы можете
            передать права другому пользователю в форме редактирования художника.
          </Form.Text>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button variant="danger" onClick={delUser}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
