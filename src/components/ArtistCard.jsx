import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { ARTIST_ROUTE } from '../utils/consts.js';

export default observer(({ artist }) => {
  const navigate = useNavigate();
  const img = `${process.env.REACT_APP_API_URL}artists/${artist.img}`;

  return (
    <Col md={3} onClick={() => navigate(`${ARTIST_ROUTE}/${artist.id}`)}>
      <Card style={{cursor: 'pointer'}} className='mb-3'>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <div className='d-flex justify-content-center align-items-center'>
            <Card.Title>{artist.name}</Card.Title>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
});
