import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { createLike, deleteLike } from '../http/likeAPI.js';

export default observer(({
  artId, likes, liked, setLiked,
}) => {
  const [likesCount, setLikesCount] = useState();

  useEffect(() => {
    setLikesCount(likes);
  }, [likes]);

  const toggleCheckbox = async () => {
    if (liked) {
      await deleteLike(artId).then(() => setLikesCount((p) => p - 1));
    } else {
      await createLike(artId).then(() => setLikesCount((p) => p + 1));
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
