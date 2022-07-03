import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import { Context } from '../index.js';
import ArtItem from './ArtItem.js';

export default observer(() => {
  const {art} = useContext(Context);

  return (
    <Row className='d-flex pt-2'>
      {art.arts.map((art) => (<ArtItem key={art.id} art={art} />))}
    </Row>
  );
});
