import React, { useEffect, useContext, useState } from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../index.css';
import { fetchOneArt } from '../http/artAPI.js';
import { ARTIST_ROUTE, MAIN_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';
import MarkCheckbox from '../components/MarkCheckbox.jsx';
// import EditArt from '../components/modals/EditArt.jsx';
import DeleteArt from '../components/modals/DeleteArt.jsx';

export default observer(() => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const { id } = useParams();
  const [art, setArt] = useState({ artists: [], imgs: [], properties: [] });
  const [img, setImg] = useState('');
  const [checked, setChecked] = useState(false);
  // const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    fetchOneArt(id)
      .then((data) => {
        setArt(data);
        setImg(`${process.env.REACT_APP_API_URL}arts/${data.img}`);
      })
      .catch(() => navigate(MAIN_ROUTE));
  }, [id, navigate]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={8}>
          <Image className="w-100" src={img} />
          <Row>
            {art.imgs.map((i) => (
              <Col
                key={i}
                xs={3}
                className="my-2"
                onClick={() => setImg(`${process.env.REACT_APP_API_URL}arts/${i}`)}
              >
                <Image className="w-100" src={`${process.env.REACT_APP_API_URL}arts/${i}`} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <div className="position-relative">
              <div className="position-absolute top-0 end-0 mx-3">
                <MarkCheckbox artId={id} checked={checked} setChecked={setChecked} />
              </div>
            </div>
            {art.artists.map((artist) => (
              <Row
                key={artist.id}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`${ARTIST_ROUTE}/${artist.id}`)}
              >
                <h6>{artist.name}</h6>
              </Row>
            ))}
          </Row>

          <Row>
            <h2>{art.name}</h2>
          </Row>
          <Row>
            <h6>{art.about}</h6>
          </Row>
          <Row>
            <h5>{art.city}</h5>
          </Row>
          <Row>
            <h5>{art.year}</h5>
          </Row>
          <Row>
            {art.properties.map((property) => (
              <Row key={property.id}>
                <h6>{`${property.title}: ${property.description}`}</h6>
              </Row>
            ))}
          </Row>

          {(User.role === 'admin'
            || User.artists.some((artist) => art.artists.some((a) => a.id === artist.id))) && (
            <Row>
              {/* <Button
                className='mt-2 mb-2'
                variant="outline-dark"
                onClick={() => setEditVisible(true)}
                >
                Редактировать
              </Button>
              <EditArt show={editVisible} onHide={() => setEditVisible(false)} /> */}
              <Button
                className="my-2"
                variant="outline-danger"
                onClick={() => setDeleteVisible(true)}
              >
                Удалить
              </Button>

              <DeleteArt show={deleteVisible} onHide={() => setDeleteVisible(false)} />
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
});
