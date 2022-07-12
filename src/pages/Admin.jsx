import React, { useContext, useState } from 'react';
import {
  Button, Container, Form, Stack,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { createType, deleteType } from '../http/typeAPI.js';
import { TypesContext } from '../contexts.jsx';

export default observer(() => {
  const Types = useContext(TypesContext);
  const [type, setType] = useState(0);
  const [typeName, setTypeName] = useState('');

  return (
    <Container>
      <hr />
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
      </Stack>
      <hr />
      <Stack direction="horizontal" gap={2}>
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
