import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { LIMIT } from '../utils/consts.js';
import { fetchArts } from '../http/artAPI.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';
import TypeBar from '../components/TypeBar.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [prevArts, setPrevArts] = useState();
  const [typeId, setTypeId] = useState();
  const [prevTypeId, setPrevTypeId] = useState();
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      const params = { typeId, page, limit: LIMIT };
      fetchArts({ ...params, userId: User.id })
        .then((data) => {
          if (prevTypeId === typeId) {
            setArts([...arts, ...data.rows]);
          } else {
            setArts(data.rows);
            setPrevTypeId(typeId);
          }
          setPrevArts(data.rows.length);
          setPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  const scrollHandler = ({ target: { documentElement } }) => {
    const { scrollHeight, scrollTop } = documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 200 && prevArts === LIMIT) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (prevArts === LIMIT) {
      document.addEventListener('scroll', scrollHandler);
    }
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [typeId, prevArts]);

  useEffect(() => {
    setFetching(true);
    setPage(1);
  }, [typeId]);

  const changeType = (id) => {
    setPrevTypeId(typeId);
    setTypeId(id);
  };

  return (
    <Container>
      <TypeBar changeType={changeType} />
      <ArtList arts={arts} />
    </Container>
  );
});
