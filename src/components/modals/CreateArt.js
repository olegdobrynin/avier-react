import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../..'
import { createArt, fetchArtists, fetchTypes } from '../../http/artAPI'
import { ART_ROUTE } from '../../utils/consts'

export default observer( function CreateArt({show, onHide}) {
  const now = Date.now();
  const navigate = useNavigate();
  const {art} = useContext(Context)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [about, setAbout] = useState('')
  const [year, setYear] = useState('')
  const [city, setCity] = useState('')
  const [properties, setProperties] = useState([])
  const [artists, setArtists] = useState([]);

  useEffect( () => {
    fetchTypes().then(data => art.setTypes(data))
    fetchArtists().then(data => art.setArtists(data))
}, [])

  const addProperty = () => {
    setProperties([...properties, {title: '', description: '', number: Date.now() - now}])
  }

  const changeProperty = (key, value, number) => {
    setProperties(properties.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const removeProperty = (number) => {
    setProperties(properties.filter(i => i.number !== number))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addArt = () => {
    const formData = new FormData()
    formData.set('name', name)
    formData.set('year', `${year}`)
    formData.set('typeId', art.selectedType.id)
    formData.set('about', about)
    formData.set('city', city)
    formData.set('properties', JSON.stringify(properties))
    formData.set('artists', JSON.stringify([artists]))
    formData.append('img', file)
    createArt(formData).then(data => {
       onHide()
       navigate(ART_ROUTE + '/' + data.id)
      }
    )
  }


  return (
    <Modal
    show={show}
    onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить объект
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
              <div className='d-flex flex-row'>
                <Dropdown className='mt-2 mb-2 me-2'>
                    <Dropdown.Toggle>{art.selectedArtist.name || "художник"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {art.artists.map(artist =>
                        <Dropdown.Item
                        onClick={() => {
                            art.setSelectedArtist(artist)
                            setArtists(artist.id)
                           }
                         }
                        key={artist.id}
                        >
                          {artist.name}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Button
                  className='mt-2 mb-2'
                  onClick={() => {}}
                >
                  +
                </Button>
              </div>
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>{art.selectedType.name || "тип"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {art.types.map(type =>
                        <Dropdown.Item
                        onClick={() => art.setSelectedType(type)}
                        key={type.id}
                        >
                          {type.name}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='mt-3'
                  placeholder='Введите название..'
                />
                 <Form.Control
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                        className='mt-3'
                        as="textarea"
                        rows={3}
                        placeholder='описание'
                      />
                      <Form.Control
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className='mt-3'
                  placeholder='Город..'
                />
                <Form.Control
                  value={year}
                  onChange={e => {
                    if (e.target.value.length <=4) {
                      setYear(e.target.value)
                    } else { return }
                }}
                  className='mt-3'
                  placeholder='год'
                  type="number"
                  min="1"
                  max="2022"
                  maxLength="4"
                />

                <Form.Control
                  className='mt-3'
                  type='file'
                  onChange={selectFile}
                />

                <hr/>

                {properties.map(i =>
                  <Row className='mt-3' key={i.number}>
                    <Col md={4}>
                      <Form.Control
                        value={i.title}
                        onChange={(e) => changeProperty('title', e.target.value, i.number)}
                        placeholder='название свойства'
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        value={i.description}
                        onChange={(e) => changeProperty('description', e.target.value, i.number)}
                        placeholder='описание'
                      />
                    </Col>
                    <Col md={4}>
                      <Button
                        variant={"outline-danger"}
                        onClick={() => removeProperty(i.number)}
                      >
                        Удалить
                      </Button>
                    </Col>
                  </Row>
                  )}
                  <Button
                  className='mt-3'
                  variant={'outline-dark'}
                  onClick={addProperty}
                >
                  Добавить свойство
                </Button>
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button onClick={addArt}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  )
})
