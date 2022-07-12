import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchMarks } from '../http/markAPI.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';
import Pages from '../components/Pages.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchMarks(User.id, page).then((data) => {
      setArts(data.rows);
      setTotalCount(data.count);
    });
  }, [User, page]);

  return (
    <Container>
      <ArtList arts={arts} />
      {!totalCount || <Pages page={page} setPage={setPage} totalCount={totalCount} />}
    </Container>
  );
});
