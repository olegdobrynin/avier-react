import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import LikeCheckbox from './LikeCheckbox.jsx';
import MarkCheckbox from './MarkCheckbox.jsx';
import { ART_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';

export default observer(({ art }) => {
  const User = useContext(UserContext);
  const [liked, setLiked] = useState(art.like);
  const [marked, setMarked] = useState(art.mark);

  return (
    <Col md={3}>
      <Card style={{ cursor: 'pointer' }} border="light" className="mb-3 w-100">
        <Link to={`${ART_ROUTE}/${art.id}`} tabIndex="0" style={{ textDecoration: 'none' }}>
          <Card.Img className="w-100" src={`${process.env.REACT_APP_API_URL}arts/${art.img}`} />
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Title style={{ color: 'black' }}>{art.name}</Card.Title>
            </div>
          </Card.Body>
        </Link>
        {User.isAuth && (
          <div className="d-flex justify-content-between mx-3 my-3">
            <LikeCheckbox artId={art.id} likes={art.likes} liked={liked} setLiked={setLiked} />
            <MarkCheckbox artId={art.id} marked={marked} setMarked={setMarked} />
          </div>
        )}
      </Card>
    </Col>
  );
});
