import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { deleteArt } from '../../http/artAPI.js';
import { MAIN_ROUTE } from '../../utils/consts.js';

export default observer(({ show, onHide }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const delArt = () => deleteArt(id).then((data) => {
    alert(data.message);
    navigate(MAIN_ROUTE);
  });

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Точно?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button variant="danger" onClick={delArt}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
