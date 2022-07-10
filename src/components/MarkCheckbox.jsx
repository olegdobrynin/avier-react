import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { checkMark, createMark, deleteMark } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';

export default observer(({ artId, checked, setChecked }) => {
  const User = useContext(UserContext);

  useEffect(() => {
    if (User.isAuth) {
      checkMark(User.id, artId).then((e) => setChecked(e));
    }
  }, [artId, setChecked, User]);

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
