import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ARTIST_ROUTE } from '../utils/consts.js';

export default observer(({ artist }) => {
  const img = `${process.env.REACT_APP_ARTISTS_URL}/${artist.img}`;

  return (
    <Col md={3}>
      <Card style={{ cursor: 'pointer' }} className="mb-3">
        <Link tabIndex="0" style={{ textDecoration: 'none' }} to={`${ARTIST_ROUTE}/${artist.id}`}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Title style={{ color: 'black' }}>{artist.name}</Card.Title>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
});
