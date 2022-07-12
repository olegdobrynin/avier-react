import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { fetchArts } from '../http/artAPI.js';
import { fetchOneArtist } from '../http/artistAPI.js';
import { MAIN_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';
import EditArtist from '../components/modals/EditArtist.jsx';
import DeleteArtist from '../components/modals/DeleteArtist.jsx';

export default observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [artist, setArtist] = useState({});
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    fetchOneArtist(id)
      .then((data) => setArtist({ ...data, img: `${process.env.REACT_APP_API_URL}artists/${data.img}` }))
      .then(() => fetchArts(null, User.id, id))
      .then((data) => setArts(data.rows))
      .catch(() => navigate(MAIN_ROUTE));
  }, [User, id, navigate]);

  return (
    <Container className="mt-3">
      <Row className="my-3">
        <Col md={8}>
          <Image className="w-100" src={artist.img} />
        </Col>
        <Col md={4}>
          <Row>
            <h2>{artist.name}</h2>
          </Row>
          {artist.bio && (
            <Row>
              <h6>{artist.bio}</h6>
            </Row>
          )}
          {(User.role === 'admin' || User.artists.some((a) => a.id === Number(id))) && (
            <Row>
              <Button className="my-2" variant="outline-dark" onClick={() => setEditVisible(true)}>
                Редактировать
              </Button>
              <EditArtist
                show={editVisible}
                onHide={() => setEditVisible(false)}
                artist={artist}
                setArtist={setArtist}
              />
              <Button
                className="my-2"
                variant="outline-danger"
                onClick={() => setDeleteVisible(true)}
              >
                Удалить
              </Button>
              <DeleteArtist show={deleteVisible} onHide={() => setDeleteVisible(false)} />
            </Row>
          )}
        </Col>
      </Row>
      <ArtList arts={arts} />
    </Container>
  );
});
