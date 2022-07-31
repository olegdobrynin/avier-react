import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { LIMIT } from '../utils/consts.js';
import { fetchMarks } from '../http/markAPI.js';
import ArtList from '../components/ArtList.jsx';

export default observer(() => {
  const [arts, setArts] = useState([]);
  const [prevArtsCount, setPrevArtsCount] = useState();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      fetchMarks(arts.at(-1)?.id, LIMIT)
        .then((data) => {
          setArts([...arts, ...data]);
          setPrevArtsCount(data.length);
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
      <ArtList arts={arts} />
    </Container>
  );
});
