import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchArts } from '../http/artAPI.js';
import { UserContext } from '../contexts.jsx';
import ArtList from '../components/ArtList.jsx';
import Pages from '../components/Pages.jsx';
import TypeBar from '../components/TypeBar.jsx';

export default observer(() => {
  const User = useContext(UserContext);
  const [arts, setArts] = useState([]);
  const [type, setType] = useState();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchArts(type, User.id, null, page, 8).then((data) => {
      setArts(data.rows);
      setTotalCount(data.count);
    });
  }, [User, page, type]);

  useEffect(() => setPage(1), [type]);

  return (
    <Container>
      <TypeBar type={type} setType={setType} setPage={setPage} />
      <ArtList arts={arts} />
      {!totalCount || <Pages page={page} setPage={setPage} totalCount={totalCount} />}
    </Container>
  );
});
