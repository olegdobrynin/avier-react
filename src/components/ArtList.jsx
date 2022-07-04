import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import { Context } from '../index.jsx';
import ArtItem from './ArtItem.jsx';

export default observer(() => {
  const {art} = useContext(Context);

  return (
    <Row className='d-flex pt-2'>
      {art.arts.map((art) => (<ArtItem key={art.id} art={art} />))}
    </Row>
  );
});
