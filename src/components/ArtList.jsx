import React from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ArtItem from './ArtItem.jsx';

export default observer(({ arts }) => (
  <Row className="d-flex pt-2">
    {arts.map((art) => (
      <ArtItem key={art.id} art={art} />
    ))}
  </Row>
));
