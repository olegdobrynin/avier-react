import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { LIMIT } from '../utils/consts.js';
import { fetchMarks } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [prevArtsCount, setPrevArtsCount] = useState();
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      fetchMarks(User.id, page, LIMIT)
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
    <Container>
      <ArtList arts={arts} />
    </Container>
  );
});
