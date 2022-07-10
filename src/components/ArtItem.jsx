import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import MarkCheckbox from './MarkCheckbox.jsx';
import { ART_ROUTE } from '../utils/consts.js';

export default observer(({ art }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <Col md={3}>
      <Card style={{ cursor: 'pointer' }} border="light" className="mb-3 w-100">
        <div className="position-relative">
          <div className="position-absolute top-0 end-0 mx-3">
            <MarkCheckbox artId={art.id} checked={checked} setChecked={setChecked} />
          </div>
        </div>
        <Card.Link
          onClick={() => navigate(`${ART_ROUTE}/${art.id}`)}
          tabIndex="0"
          style={{ textDecoration: 'none' }}
          href="#"
        >
          <Card.Img className="w-100" src={`${process.env.REACT_APP_API_URL}arts/${art.img}`} />
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Title style={{ color: 'black' }}>{art.name}</Card.Title>
            </div>
          </Card.Body>
        </Card.Link>
      </Card>
    </Col>
  );
});
