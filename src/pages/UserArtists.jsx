import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ArtistList from '../components/ArtistList.jsx';
import DeleteUser from '../components/modals/DeleteUser.jsx';

export default observer(() => {
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
});
