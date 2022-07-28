import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { fetchArts } from '../http/artAPI.js';
import { fetchOneArtist } from '../http/artistAPI.js';
import { LIMIT, MAIN_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';
import EditArtist from '../components/modals/EditArtist.jsx';
import DeleteArtist from '../components/modals/DeleteArtist.jsx';

export default observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [prevArtsCount, setPrevArtsCount] = useState();
  const [artist, setArtist] = useState({});
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    fetchOneArtist(id)
      .then((data) => setArtist({ ...data, img: `${process.env.REACT_APP_API_URL}artists/${data.img}` }))
      .catch(() => navigate(MAIN_ROUTE));
  }, [User, id, navigate]);

  useEffect(() => {
    if (fetching) {
      fetchArts(User.isAuth, { artistId: id, page, limit: LIMIT })
        .then((data) => {
          setArts([...arts, ...data]);
          setPrevArtsCount(data.length);
          setPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  const scrollHandler = ({ target: { documentElement } }) => {
    const { scrollHeight, scrollTop } = documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 200 && prevArtsCount === LIMIT) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (prevArtsCount === LIMIT) {
      document.addEventListener('scroll', scrollHandler);
    }
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [prevArtsCount]);

  return (
    <Container className="mt-3">
      <Row className="my-3">
        <Col md={5}>
          <Image className="w-100" src={artist.img} />
        </Col>
        <Col md={7}>
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
