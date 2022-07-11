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
  const [liked, setLiked] = useState(art.like?.length > 0);
  const [marked, setMarked] = useState(art.mark?.length > 0);

  return (
    <Col md={3}>
      <Card style={{ cursor: 'pointer' }} border="light" className="mb-3 w-100">
        <div className="position-relative">
          <div className="position-absolute top-0 end-0 mx-3">
            {User.isAuth && <MarkCheckbox artId={art.id} marked={marked} setMarked={setMarked} />}
          </div>
        </div>
        <Link to={`${ART_ROUTE}/${art.id}`} tabIndex="0" style={{ textDecoration: 'none' }}>
          <Card.Img className="w-100" src={`${process.env.REACT_APP_API_URL}arts/${art.img}`} />
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Title style={{ color: 'black' }}>{art.name}</Card.Title>
            </div>
          </Card.Body>
        </Link>
      </Card>
      {User.isAuth && (
        <LikeCheckbox artId={art.id} likes={art.likes} liked={liked} setLiked={setLiked} />
      )}
    </Col>
  );
});
