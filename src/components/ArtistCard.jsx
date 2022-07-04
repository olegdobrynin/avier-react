import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ARTIST_ROUTE } from '../utils/consts.js';

export default observer(({ artist }) => {
  const navigate = useNavigate();
  const img = `${process.env.REACT_APP_API_URL}artists/${artist.img}`;

  return (
    <Col md={3}>
      <Card style={{cursor: 'pointer'}} className='mb-3'>
        <Card.Link
          tabIndex="0"
          onClick={() => navigate(`${ARTIST_ROUTE}/${artist.id}`)}
          style={{'text-decoration': "none"}}
          href="#"
        >
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <div className='d-flex justify-content-center align-items-center'>
              <Card.Title style={{color: "black"}}>{artist.name}</Card.Title>
            </div>
          </Card.Body>
        </Card.Link>
      </Card>
    </Col>
  )
});
