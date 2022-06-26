import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ArtistList from '../components/ArtistList'


export default function Admin() {

  return (
    <Container
    className='py-5'
    >
      <Row className='px-5'>
        <ArtistList />
      </Row>
    </Container>
  )
}
