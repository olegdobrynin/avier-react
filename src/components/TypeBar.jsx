import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { TypesContext } from '../contexts.jsx';

export default observer(({ changeType }) => {
  const Types = useContext(TypesContext);

  return (
    <Nav variant="pills" defaultActiveKey="0" className="my-2">
      <div className="scrolling">
        <Nav.Item key="0" className="typeCard">
          <Nav.Link eventKey="0" key="0" onClick={() => changeType()}>
            Все
          </Nav.Link>
        </Nav.Item>
        {Types.types.map(({ id, name }) => (
          <Nav.Item key={id}>
            <Nav.Link eventKey={id} key={id} onClick={() => changeType(id)}>
              {name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
    </Nav>
  );
});
