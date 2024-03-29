import React, { useEffect, useContext, useState } from 'react';
import {
  Button, Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../index.css';
import { fetchOneArt } from '../http/artAPI.js';
import { ARTIST_ROUTE, MAIN_ROUTE } from '../utils/consts.js';
import { UserContext } from '../contexts.jsx';
import LikeCheckbox from '../components/LikeCheckbox.jsx';
import MarkCheckbox from '../components/MarkCheckbox.jsx';
// import EditArt from '../components/modals/EditArt.jsx';
import DeleteArt from '../components/modals/DeleteArt.jsx';

export default observer(() => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const { id } = useParams();
  const [art, setArt] = useState({});
  const [img, setImg] = useState('');
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  // const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    fetchOneArt(User.isAuth, id)
      .then((data) => {
        setArt(data);
        setImg(`${process.env.REACT_APP_ARTS_URL}/${data.img}`);
        setMarked(data.mark?.length > 0);
        setLiked(data.like?.length > 0);
      })
      .catch(() => navigate(MAIN_ROUTE));
  }, [User, id, navigate]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={6}>
          <Image className="w-100 mb-3" id="img" src={img} />
          <Row>
            {art.imgs
              && art.imgs.length > 1
              && art.imgs.map((i) => (
                <Col key={i} xs={3} className="mt-2">
                  <Card style={{ cursor: 'pointer' }} border="light" className="mb-3 w-100">
                    <Card.Link
                      href="#img"
                      tabIndex="0"
                      onClick={() => setImg(`${process.env.REACT_APP_ARTS_URL}/${i}`)}
                    >
                      <Card.Img className="w-100" src={`${process.env.REACT_APP_ARTS_URL}/${i}`} />
                    </Card.Link>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <div className="d-flex justify-content-between">
              {User.isAuth && (
                <>
                  <LikeCheckbox artId={id} likes={art.likes} liked={liked} setLiked={setLiked} />
                  <MarkCheckbox artId={id} marked={marked} setMarked={setMarked} />
                </>
              )}
            </div>
          </Row>
          <Row>
            <div className="scrolling">
              {art.artists
                && art.artists.map((artist) => (
                  <Link
                    className=" d-flex flex-nowrap w-100"
                    key={artist.id}
                    style={{ cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' }}
                    tabIndex="0"
                    to={`${ARTIST_ROUTE}/${artist.id}`}
                  >
                    <h3 style={{ color: 'black' }} className="me-3">
                      {artist.name}
                    </h3>
                  </Link>
                ))}
            </div>
          </Row>

          <Row>
            <h1>{art.name}</h1>
          </Row>
          {art.about && (
            <Row>
              <h6>{art.about}</h6>
            </Row>
          )}
          {art.city && (
            <Row>
              <h5>{art.city}</h5>
            </Row>
          )}
          {art.year && (
            <Row>
              <h5>{art.year}</h5>
            </Row>
          )}
          {art.properties && (
            <Row>
              {art.properties.map((property) => (
                <Row key={property.title}>
                  <h6>{`${property.title}: ${property.description}`}</h6>
                </Row>
              ))}
            </Row>
          )}

          {(User.role === 'admin'
            || User.artists.some((artist) => art.artists?.some((a) => a.id === artist.id))) && (
            <Row className="mx-1">
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
