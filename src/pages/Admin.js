import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import ArtistList from '../components/ArtistList.js';
import DeleteUser from '../components/modals/DeleteUser.js';


export default () => {
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <Container className='py-5' >
      <Row className='px-5' >
        <ArtistList />
      </Row>
      <Row>
        <Button
          className="my-2"
          variant="outline-danger"
          onClick={() => setDeleteVisible(true)}
        >
          Удалить
        </Button>
      </Row>
      <DeleteUser show={deleteVisible} onHide={() => setDeleteVisible(false)} />
    </Container>
  );
};
