import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { Context } from '../index.jsx';
import { checkMark, createMark, deleteMark } from '../http/markAPI.js';

export default observer(({ artId, checked, setChecked }) => {
  const { user } = useContext(Context);

  useEffect(() => {
    if (localStorage.token) {
      checkMark(user.info.id, artId).then((e) => setChecked(e));
    }
  }, [artId, user]);

  const toggleCheckbox = () => {
    if (checked) {
      deleteMark(user.info.id, artId);
    } else {
      createMark(user.info.id, artId);
    }
    setChecked(!checked);
  };

  return (
    <>
      {!user.isAuth || (
        <Form.Check checked={checked} aria-label="option 1" onClick={toggleCheckbox} />
      )}
    </>
  );
});
