import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchMarks } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [prevArtsCount, setPrevArtsCount] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(Number(process.env.REACT_APP_LIMIT));
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      fetchMarks(User.id, page, limit)
        .then((data) => {
          setArts([...arts, ...data.rows]);
          setPrevArtsCount(data.rows.length);
          setPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  const scrollHandler = ({ target: { documentElement } }) => {
    const { scrollHeight, scrollTop } = documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 200 && prevArtsCount === limit) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (prevArtsCount === limit) {
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
