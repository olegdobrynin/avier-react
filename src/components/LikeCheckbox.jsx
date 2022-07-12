import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { createLike, deleteLike } from '../http/likeAPI.js';
import { UserContext } from '../contexts.jsx';

export default observer(({
  artId, likes, liked, setLiked,
}) => {
  const User = useContext(UserContext);

  const toggleCheckbox = async () => {
    if (liked) {
      await deleteLike(User.id, artId);
    } else {
      await createLike(User.id, artId);
    }
    setLiked(!liked);
  };

  return <Form.Check className="px-0" checked={liked} label={likes} id="likecb" onChange={toggleCheckbox} />;
});
