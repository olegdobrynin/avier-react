import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { createMark, deleteMark } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';

export default observer(({ art, checked, setChecked }) => {
  const User = useContext(UserContext);

  const toggleCheckbox = () => {
    if (checked) {
      deleteMark(User.id, art.id);
    } else {
      createMark(User.id, art.id);
    }
    setChecked(!checked);
  };

  return (
    User.isAuth && <Form.Check checked={checked} aria-label="option 1" onChange={toggleCheckbox} />
  );
});
