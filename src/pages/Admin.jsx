import React, { useContext, useState } from 'react';
import {
  Button, Container, Form, Stack,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { createType, deleteType } from '../http/typeAPI.js';
import { TypesContext } from '../contexts.jsx';
import { setUserRole } from '../http/userAPI.js';

export default observer(() => {
  const Types = useContext(TypesContext);
  const [type, setType] = useState(0);
  const [role, setRole] = useState(0);
  const [typeName, setTypeName] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <Container>
      <hr />
      <Form.Label>Пользователи</Form.Label>
      <Stack direction="horizontal" gap={2}>
        <Form.Control
          type="text"
          placeholder="Имя пользователя"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Form.Select key="0" onChange={(e) => setRole(e.target.value)}>
          <option value="0">Роль</option>
          <option value="user">Пользователь</option>
          <option value="artist">Художник</option>
          <option value="admin">Администратор</option>
        </Form.Select>

        <Button variant="primary" onClick={() => setUserRole(userName, role)}>
          Изменить
        </Button>
      </Stack>
      <hr />
      <Form.Label>Типы</Form.Label>
      <Stack direction="horizontal" gap={2}>
        <Form.Control
          type="text"
          placeholder="Добавить тип"
          onChange={(e) => setTypeName(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => createType(typeName).then((t) => Types.addType(t))}
        >
          Добавить
        </Button>
        <div className="vr" />
        <Form.Select key="0" onChange={(e) => setType(e.target.value)}>
          <option value="0">Тип</option>
          {Types.types.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="danger"
          onClick={() => deleteType(type).then(() => Types.deleteType(type))}
        >
          Удалить
        </Button>
      </Stack>
      <hr />
    </Container>
  );
});
