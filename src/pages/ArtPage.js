import { observer } from 'mobx-react-lite';
import React, { useEffect, useContext, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../index.js';
import { fetchOneArt } from '../http/artAPI.js';
import { ARTIST_ROUTE, MAIN_ROUTE } from '../utils/consts.js';
// import EditArt from '../components/modals/EditArt.js';
import DeleteArt from '../components/modals/DeleteArt.js';

export default observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { id } = useParams();
  const [art, setArt] = useState({ properties: [], artists: [], imgs: [] });
  const [img, setImg] = useState();
  // const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    fetchOneArt(id)
      .then((data) => {
        setArt(data);
        setImg(`${process.env.REACT_APP_API_URL}arts/${data.img}`);
      })
      .catch(() => navigate(MAIN_ROUTE));
  }, []);

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={8}>
          <Image className="w-100" src={img}/>
          <Row>
            {art.imgs.map((img) => (
              <Col
                key={img}
                md={3}
                className="mt-2"
                onClick={() => {setImg(`${process.env.REACT_APP_API_URL}arts/${img}`)}}
              >
                <Image
                  className='w-100'
                  src={`${process.env.REACT_APP_API_URL}arts/${img}`}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            {art.artists.map((artist) => (
              <Row
                key={artist.id}
                style={{cursor: 'pointer'}}
                onClick={() => navigate(`${ARTIST_ROUTE}/${artist.id}`)}
              >
                <h6>{artist.name}</h6>
              </Row>
            ))}
          </Row>

          <Row><h2>{art.name}</h2></Row>
          <Row><h6>{art.about}</h6></Row>
          <Row><h5>{art.city}</h5></Row>
          <Row><h5>{art.year}</h5></Row>
          <Row>
            {art.properties.map((property) =>
              <Row key={property.id}>
                <h6>{property.title}: {property.description}</h6>
              </Row>
            )}
          </Row>

          {!user.artists.some(({ id }) => art.artists.some((a) => a.id === id)) || (
            <Row>
              {/* <Button
                className='mt-2 mb-2'
                variant="outline-dark"
                onClick={() => setEditVisible(true)}
                >
                Редактировать
              </Button> */}
              <Button
                className='mt-2 mb-2'
                variant="outline-danger"
                onClick={() => setDeleteVisible(true)}
              >
                Удалить
              </Button>
            </Row>
          )}
        </Col>
      </Row>
      {/* <EditArt show={editVisible} onHide={() => setEditVisible(false)} /> */}
      <DeleteArt show={deleteVisible} onHide={() => setDeleteVisible(false)} />
    </Container>
  );
});
