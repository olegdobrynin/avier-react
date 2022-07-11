import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import MarkCheckbox from './MarkCheckbox.jsx';
import { ART_ROUTE } from '../utils/consts.js';

export default observer(({ art }) => {
  const [checked, setChecked] = useState(art?.mark?.length > 0);

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
      </Card>
      <MarkCheckbox art={art} checked={checked} setChecked={setChecked} />
    </Col>
  );
});
