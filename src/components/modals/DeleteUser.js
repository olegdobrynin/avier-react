import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../index.js';
import { auth, deleteUser } from '../../http/userAPI.js';
import { MAIN_ROUTE } from '../../utils/consts.js';

export default ({ show, onHide }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { id, login } = user.info;
  const [password, setPassword] = useState('');

  const delUser = () => {
    auth(login, password).then(() => {
      deleteUser(id).then(() => {
        user.clear();
        localStorage.clear();
        onHide();
        navigate(MAIN_ROUTE);
      });
    }).catch((e) => alert(e.response.data.message));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Вы уверены?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="password">
          <Form.Label>Данное действие необратимо!</Form.Label>
          <Form.Control
            type="password"
            placeholder="Для удаления пользователя введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button variant="danger" onClick={delUser}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};