import React from 'react';
import { Pagination } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

export default observer(({ page, setPage, totalCount }) => {
  const pageCount = Math.ceil(totalCount / 8);
  const pages = [...Array(pageCount)].map((_, i) => i + 1);
  const pagesList = pages.map((p) => (
    <Pagination.Item key={p} active={page === p} onClick={() => setPage(p)}>
      {p}
    </Pagination.Item>
  ));

  return (
    <Pagination className="mt-5">
      <Pagination.First onClick={() => setPage(1)} />
      <Pagination.Prev onClick={() => setPage(page - 1 || page)} />
      {pagesList}
      <Pagination.Next onClick={() => setPage(page === pages.length ? page : page + 1)} />
      <Pagination.Last onClick={() => setPage(pages.length)} />
    </Pagination>
  );
});
