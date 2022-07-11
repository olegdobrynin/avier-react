import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createArtist } from '../../http/artistAPI.js';
import { ARTIST_ROUTE } from '../../utils/consts.js';
import { UserContext } from '../../contexts.jsx';

export default observer(({ show, onHide }) => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const userId = User.id;
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addArtist = () => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('bio', bio);
    formData.set('userId', userId);
    if (file) {
      formData.append('img', file);
    }
    return createArtist(formData)
      .then((artist) => {
        setTimeout(() => {
          onHide();
          navigate(`${ARTIST_ROUTE}/${artist.id}`);
          setName('');
          setBio('');
          setFile(null);
          User.addArtist(artist);
        }, 100);
      })
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить художника</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя.."
          />
          <Form.Control
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-3"
            as="textarea"
            rows={3}
            placeholder="Биография"
          />
          <Form.Control
            className="mt-3"
            type="file"
            accept="image/jpeg,image/png"
            onChange={selectFile}
          />
          <Form.Text>
            Выберите фотографию формата JPEG или PNG, максимальный размер файла ограничен 2Мб.
          </Form.Text>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button onClick={addArtist}>Создать</Button>
      </Modal.Footer>
    </Modal>
  );
});
