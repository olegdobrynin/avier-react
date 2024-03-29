import React, { useContext, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../contexts.jsx';
import ArtistCard from './ArtistCard.jsx';
import CreateArtist from './modals/CreateArtist.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const [artistVisible, setArtistVisible] = useState(false);

  return (
    <Row className="d-flex pt-2">
      {User.artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
      <Col md={3}>
        <Card style={{ cursor: 'pointer' }} className="mb-3">
          <Card.Link
            tabIndex="0"
            onClick={() => setArtistVisible(true)}
            style={{ textDecoration: 'none' }}
            href="#"
          >
            <Card.Img variant="top" src="/plus.png" />
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center">
                <Card.Title style={{ color: 'black' }}>Добавить художника</Card.Title>
              </div>
            </Card.Body>
          </Card.Link>
        </Card>
      </Col>
      <CreateArtist show={artistVisible} onHide={() => setArtistVisible(false)} />
    </Row>
  );
});
