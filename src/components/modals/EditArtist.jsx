import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../../index.jsx';
import { updateArtist } from '../../http/artistAPI.js';

export default observer(({ show, onHide, artist, setArtist, setImg }) => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null)
  const [userLogin, setUserLogin] = useState(user.info.login);

  useEffect(() => {
    setName(artist.name);
    setBio(artist.bio);
  }, [artist]);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addArtist = () => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('bio', bio);
    formData.set('userLogin', userLogin);
    if (file) {
      formData.append('img', file);
    }
    return updateArtist(id, formData)
      .then((data) => {
        if (userLogin === user.info.login) {
          user.updateArtist({ id: Number(id), name: data.name, img: data.img });
        } else {
          user.deleteArtist({ id });
        }
        setArtist(data);
        setImg(`${process.env.REACT_APP_API_URL}artists/${data.img}`);
        onHide();
      })
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить художника
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-3'
            placeholder='Введите имя..'
          />
          <Form.Control
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className='mt-3'
            as="textarea"
            rows={3}
            placeholder='Биография'
          />
          <Form.Control
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            className='mt-3'
            placeholder='Введите логин...'
          />
          <Form.Text muted>
            Для передачи прав на художника введите логин пользователя.
          </Form.Text>
          <Form.Control
            className='mt-1'
            type='file'
            onChange={selectFile}
          />
          <Form.Text>
            Выберите фотографию формата JPEG или PNG, максимальный размер файла ограничен 2Мб.
          </Form.Text>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button onClick={addArtist}>Изменить</Button>
      </Modal.Footer>
    </Modal>
  );
});
