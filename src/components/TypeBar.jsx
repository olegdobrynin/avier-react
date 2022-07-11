import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { TypesContext } from '../contexts.jsx';

export default observer(({ type, setType }) => {
  const Types = useContext(TypesContext);

  return (
    <Nav variant="pills" defaultActiveKey={type || 0} className="my-2">
      <div className="scrolling">
        <Nav.Item key="0" class="typeCard">
          <Nav.Link eventKey="0" key="0" onClick={() => setType()}>
            Все
          </Nav.Link>
        </Nav.Item>
        {Types.types.map((t) => (
          <Nav.Item key={t.id}>
            <Nav.Link eventKey={t.id} key={t.id} onClick={() => setType(t.id)}>
              {t.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
    </Nav>
  );
});
