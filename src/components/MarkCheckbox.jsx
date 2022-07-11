import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { createMark, deleteMark } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';

export default observer(({ artId, marked, setMarked }) => {
  const User = useContext(UserContext);

  const toggleCheckbox = async () => {
    if (marked) {
      await deleteMark(User.id, artId);
    } else {
      await createMark(User.id, artId);
    }
    setMarked(!marked);
  };

  return <Form.Check checked={marked} id="checkbox" onChange={toggleCheckbox} />;
});
