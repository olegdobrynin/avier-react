import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { createMark, deleteMark } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';

export default observer(({ artId, checked, setChecked }) => {
  const User = useContext(UserContext);

  const toggleCheckbox = () => {
    if (checked) {
      deleteMark(User.id, artId);
    } else {
      createMark(User.id, artId);
    }
    setChecked(!checked);
  };

  return (
    User.isAuth && <Form.Check checked={checked} aria-label="option 1" onChange={toggleCheckbox} />
  );
});
