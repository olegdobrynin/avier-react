import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Context } from '../index.jsx';
import ArtList from '../components/ArtList.jsx';
import Pages from '../components/Pages.jsx';
import TypeBar from '../components/TypeBar.jsx';
import { fetchArts } from '../http/artAPI.js';
import { fetchTypes } from '../http/typeAPI.js';

export default observer(() => {
  const { art } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((types) => art.setTypes(types));
    fetchArts(art.selectedType, null, art.page, art.limit).then((arts) => {
      art.setArts(arts.rows);
      art.setTotalCount(arts.count);
    });
  }, [art, art.page, art.selectedType]);

  return (
    <Container>
      <TypeBar />
      <ArtList />
      {!art.totalCount || <Pages />}
    </Container>
  );
});
