import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Context } from '../index.jsx';

export default observer(() => {
  const { art } = useContext(Context);

  return (
    <Nav variant="pills" defaultActiveKey={art.selectedType || 0} className="my-2">
      <div class="scrolling">
      <Nav.Item key="0" class="typeCard">
        <Nav.Link eventKey="0" key="0" onClick={() => art.setSelectedType()}>Все</Nav.Link>
      </Nav.Item>
      {art.types.map((type) => (
        <Nav.Item key={type.id}>
          <Nav.Link
            eventKey={type.id}
            key={type.id}
            onClick={() => art.setSelectedType(type.id)}
          >
            {type.name}
          </Nav.Link>
        </Nav.Item>
      ))}
      </div>
    </Nav>
  );
});
