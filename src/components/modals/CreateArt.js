import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../..'
import { createArt, fetchArtists, fetchTypes } from '../../http/artAPI'
import { ART_ROUTE } from '../../utils/consts'

export default observer( function CreateArt({show, onHide}) {
  const navigate = useNavigate();
  const {art} = useContext(Context)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [about, setAbout] = useState('')
  const [year, setYear] = useState('')
  const [city, setCity] = useState('')
  const [property, setProperty] = useState([])
  const [artists, setArtists] = useState([]);

  useEffect( () => {
    fetchTypes().then(data => art.setTypes(data))
    fetchArtists().then(data => art.setArtists(data))
}, [])


  const addProperty = () => {
    setProperty([...property, {title: '', description: '', number: Date.now()}])
  }

  const removeProperty = (number) => {
    setProperty(property.filter(i => i.number !== number))
  }

  const changeProperty = (key, value, number) => {
    setProperty(property.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addArt = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('img', file)
    formData.append('year', `${year}`)
    formData.append('typeId', art.selectedType.id)
    formData.append('artists', JSON.stringify([artists]))
    formData.append('about', about)
    formData.append('city', city)
    formData.append('property', JSON.stringify(property))
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
                
                {property.map(i =>
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
