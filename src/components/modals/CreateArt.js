import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Dropdown, Form, Modal, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../index.js';
import { createArt } from '../../http/artAPI.js';
import { ART_ROUTE } from '../../utils/consts.js';

export default observer(({ show, onHide }) => {
  const now = Date.now();
  const getSampleArtist = () => ({ name: 'Xyдoжник', number: Date.now() - now });
  const navigate = useNavigate();
  const { art, user } = useContext(Context);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [city, setCity] = useState('');
  const [year, setYear] = useState('');
  const [artists, setArtists] = useState([getSampleArtist()]);
  const [properties, setProperties] = useState([]);
  const [files, setFiles] = useState([]);

  const addArtist = () => {
    setArtists([...artists, getSampleArtist()]);
  };

  const changeArtist = (artistId, name, number) => {
    setArtists(artists.map((i) => (i.number === number ? { ...i, artistId, name } : i)));
  };

  const removeArtist = (number) => {
    setArtists(artists.filter((i) => i.number !== number));
  };

  const addProperty = () => {
    setProperties([...properties, { title: '', description: '', number: Date.now() - now }]);
  };

  const changeProperty = (key, value, number) => {
    setProperties(properties.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const removeProperty = (number) => {
    setProperties(properties.filter((i) => i.number !== number));
  };

  const selectFiles = (e) => {
    setFiles([...e.target.files]);
  };

  const addArt = () => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('year', year);
    formData.set('typeId', type.id);
    formData.set('about', about);
    formData.set('city', city);
    formData.set('properties', JSON.stringify(properties));
    formData.set('artists', JSON.stringify(artists));
    files.forEach((file) => formData.append('img', file));

    return createArt(formData)
      .then(({ id }) => {
        onHide();
        navigate(`${ART_ROUTE}/${id}`);
      })
      .catch((err) => alert(err.response.data.message));
  };

  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      if (isLoading) {
        addArt().finally(() => setLoading(false));
      }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
      <Button disabled={isLoading} onClick={() => isLoading || handleClick()}>
        {isLoading ? 'Загрузка...' : 'Сохранить'}
      </Button>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить объект</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="d-flex flex-row">
            {artists.map(({ name, number }) => (
              <Dropdown className="mb-2 me-2">
                <Dropdown.Toggle>{name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {user.artists
                    .filter(({ id }) => !artists.some(({ artistId }) => artistId === id))
                    .map((artist) => (
                      <Dropdown.Item
                        onClick={() => changeArtist(artist.id, artist.name, number)}
                        key={artist.id}
                      >
                        {artist.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
                <Button variant="danger" onClick={() => removeArtist(number)}>-</Button>
              </Dropdown>
            ))}
            {artists.length >= user.artists.length
              || <Button className="mb-2" onClick={addArtist}>+</Button>}
          </div>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{type.name || 'Тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {art.types.map((type) => (
                <Dropdown.Item
                  onClick={() => setType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название..."
          />
          <Form.Control
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mt-3"
            as="textarea"
            rows={3}
            placeholder="Описание"
          />
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-3"
            placeholder="Город"
          />
          <Form.Control
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-3"
            placeholder="Год"
            maxLength="4"
          />
          <Form.Control
            className="mt-3"
            type="file"
            multiple
            onChange={selectFiles}
          />
          <Form.Text>
            Выберите до 5 фотографий формата JPEG или PNG, максимальный размер файла ограничен 2Мб.
          </Form.Text>

          <hr />

          {properties.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeProperty('title', e.target.value, i.number)}
                  placeholder="название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeProperty('description', e.target.value, i.number)}
                  placeholder="описание"
                />
              </Col>
              <Col md={4}>
                <Button variant="outline-danger" onClick={() => removeProperty(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
          <div className="mt-3">
            <Button variant="outline-dark" onClick={addProperty}>
              Добавить свойство
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <LoadingButton />
      </Modal.Footer>
    </Modal>
  );
});
