import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ArtistList from '../components/ArtistList.jsx';

export default observer(() => (
  <Container className="py-5">
    <Row className="px-5">
      <ArtistList />
    </Row>
  </Container>
));
