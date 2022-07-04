import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import DeleteUser from '../components/modals/DeleteUser.jsx';

export default function Profile() {
    const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <Container>
        <Row>
            <hr></hr>
            <div>      
                <Button
                variant="outline-danger"
                onClick={() => setDeleteVisible(true)}
                >
                Удалить пользователя
                </Button>
                <DeleteUser show={deleteVisible} onHide={() => setDeleteVisible(false)} />
            </div>
        </Row>
    </Container>
  )
}
