import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { ART_ROUTE } from '../utils/consts.js';

export default observer(({ art }) => {
  const navigate = useNavigate();

  return (
    <Col md={3}>
      <Card
        style={{cursor: "pointer"}}
        border={"light"}
        className="mb-3 w-100"
      >
        <Card.Link
          onClick={() => navigate(`${ART_ROUTE}/${art.id}`)}
          tabIndex="0"
          style={{'text-decoration': "none"}}
          href="#"
        >
          <Card.Img className="w-100" src={`${process.env.REACT_APP_API_URL}arts/${art.img}`} />
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Title style={{color: "black"}}>{art.name}</Card.Title>
            </div>
          </Card.Body>
        </Card.Link>
      </Card>
    </Col>
  );
});
