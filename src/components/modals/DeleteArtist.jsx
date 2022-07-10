import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { deleteArtist } from '../../http/artistAPI.js';
import { MAIN_ROUTE } from '../../utils/consts.js';
import { UserContext } from '../../contexts.jsx';

export default observer(({ show, onHide }) => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const { id } = useParams();

  const delArtist = () => {
    deleteArtist(id).then((data) => {
      User.deleteArtist({ id });
      alert(data.message);
      navigate(MAIN_ROUTE);
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Точно?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button variant="danger" onClick={delArtist}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
