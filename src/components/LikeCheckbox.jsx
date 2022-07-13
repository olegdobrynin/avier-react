import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { createLike, deleteLike } from '../http/likeAPI.js';
import { UserContext } from '../contexts.jsx';

export default observer(({
  artId, likes, liked, setLiked,
}) => {
  const User = useContext(UserContext);
  const [likesCount, setLikesCount] = useState();

  useEffect(() => {
    setLikesCount(likes);
  }, [likes]);

  const toggleCheckbox = async () => {
    if (liked) {
      await deleteLike(User.id, artId).then(() => setLikesCount((p) => p - 1));
    } else {
      await createLike(User.id, artId).then(() => setLikesCount((p) => p + 1));
    }
    setLiked(!liked);
  };

  return (
    <Form.Check
      className="px-0"
      checked={liked}
      label={likesCount}
      id="likecb"
      onChange={toggleCheckbox}
    />
  );
});
