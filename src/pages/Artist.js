import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../index.js';
import ArtList from '../components/ArtList.js';
import DeleteArtist from '../components/modals/DeleteArtist.js';
import EditArtist from '../components/modals/EditArtist.js';
import { fetchArts, fetchOneArtist } from '../http/artAPI.js';

export default observer(() => {
  const { id } = useParams();
  const { art, user } = useContext(Context);
  const [artist, setArtist] = useState({});
  const img = process.env.REACT_APP_API_URL + "artists/" + artist.img;
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    fetchOneArtist(id).then((data) => {
      setArtist(data);
    });
    fetchArts(null, id, art.page, null).then((data) => {
      art.setArts(data.rows);
      art.setTotalCount(data.count);
    });
  }, [art.page]);

  return (
    <Container className="mt-3">
      <Row className="my-3">
        <Col md={8}>
          <Image className="w-100" src={img} />
        </Col>
        <Col md={4}>
          <Row><h2>{artist.name}</h2></Row>
          <Row><h6>{artist.bio}</h6></Row>
          {!user.artists.some((artist) => artist.id === Number(id)) || (
          <Row>
            <Button
              className="my-2"
              variant="outline-dark"
              onClick={() => setEditVisible(true)}
            >
              Редактировать
            </Button>
            <Button
              className="my-2"
              variant="outline-danger"
              onClick={() => setDeleteVisible(true)}
            >
              Удалить
            </Button>
          </Row>
          )}
        </Col>
      </Row>
      <ArtList/>
      <DeleteArtist show={deleteVisible} onHide={() => setDeleteVisible(false)} />
      <EditArtist show={editVisible} onHide={() => setEditVisible(false)} />
    </Container >
  );
});
