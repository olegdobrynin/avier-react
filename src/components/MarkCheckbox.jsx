import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { createMark, deleteMark } from '../http/markAPI.js';

export default observer(({ artId, marked, setMarked }) => {
  const toggleCheckbox = async () => {
    if (marked) {
      await deleteMark(artId);
    } else {
      await createMark(artId);
    }
    setMarked(!marked);
  };

  return <Form.Check checked={marked} id="markcb" onChange={toggleCheckbox} />;
});
