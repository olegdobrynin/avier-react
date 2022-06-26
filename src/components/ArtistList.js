import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Context } from '../index'
import ArtistCard from './ArtistCard'
import CreateArtist from './modals/CreateArtist'
export default observer( function ArtistList() {

  const [artistVisible, setArtistVisible] = useState(false)
  const {user} = useContext(Context)


  return (
    <Row className='d-flex pt-2'>
      {user.artists.map(artist =>
        <ArtistCard key={artist.id} artist={artist}/>
      )}
      <Col md={3} onClick={() => setArtistVisible(true)}>
        <Card style={{cursor: 'pointer'}} className='mb-3'>
          <Card.Img variant="top" src={"/plus.png"} />
          <Card.Body>
            <div className='d-flex justify-content-center align-items-center'>
              <Card.Title>Добавить художника</Card.Title>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <CreateArtist show={artistVisible} onHide={() => setArtistVisible(false)}/>
    </Row>  
  )
}
)