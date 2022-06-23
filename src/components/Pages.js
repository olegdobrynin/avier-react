import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../index.js';

export default observer(() => {
  const { art } = useContext(Context);
  const pageCount = Math.ceil(art.totalCount / art.limit);
  const pages = [...Array(pageCount)].map((_, i) => i + 1);
  const pagesList = pages.map((page) => (
    <Pagination.Item key={page} active={art.page === page} onClick={() => art.setPage(page)}>
      {page}
    </Pagination.Item>
  ));

  return (
    <Pagination className='mt-5'>
      <Pagination.First onClick={() => art.setPage(1)} />
      <Pagination.Prev onClick={() => art.setPage(art.page - 1 || art.page)} />
      {pagesList}
      <Pagination.Next
        onClick={() => art.setPage(art.page === pages.length ? art.page : art.page + 1)}
      />
      <Pagination.Last onClick={() => art.setPage(pages.length)} />
    </Pagination>
  );
});
