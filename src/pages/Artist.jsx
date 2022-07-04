import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../index.jsx';
import ArtList from '../components/ArtList.jsx';
import EditArtist from '../components/modals/EditArtist.jsx';
import DeleteArtist from '../components/modals/DeleteArtist.jsx';
import { fetchArts } from '../http/artAPI.js';
import { fetchOneArtist } from '../http/artistAPI.js';
import { MAIN_ROUTE } from '../utils/consts.js';

export default observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { art, user } = useContext(Context);
  const [artist, setArtist] = useState({});
  const [img, setImg] = useState('');
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    fetchOneArtist(id)
      .then((data) => {
        setArtist(data);
        setImg(`${process.env.REACT_APP_API_URL}artists/${data.img}`);
      })
      .catch(() => navigate(MAIN_ROUTE));
    fetchArts(null, id, art.page, null).then((data) => {
      art.setArts(data.rows);
      art.setTotalCount(data.count);
    });
  }, [art, art.page, id, navigate]);

  return (
    <Container className="mt-3">
      <Row className="my-3">
        <Col md={8}>
          <Image className="w-100" src={img} />
        </Col>
        <Col md={4}>
          <Row><h2>{artist.name}</h2></Row>
          <Row><h6>{artist.bio}</h6></Row>
          {(user.info.role !== 'admin' && !user.artists.some((artist) => artist.id === Number(id))) || (
            <Row>
              <Button
                className="my-2"
                variant="outline-dark"
                onClick={() => setEditVisible(true)}
              >
                Редактировать
              </Button>
              <EditArtist
                show={editVisible}
                onHide={() => setEditVisible(false)}
                artist={artist}
                setArtist={setArtist}
                setImg={setImg}
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
      <ArtList/>
    </Container >
  );
});
