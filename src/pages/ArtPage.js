import { observer } from 'mobx-react-lite'
import React, { useEffect, useContext, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneArt } from '../http/artAPI'
import { ARTIST_ROUTE } from '../utils/consts'
import DeleteArt from '../components/modals/DeleteArt'
// import EditArt from '../components/modals/EditArt'
import { Context } from '../index.js';

export default observer( function ArtPage() {
    const navigate = useNavigate()
    const [art, setArt] = useState( {properties: [], artists: [], imgs: []} )
    const {id} = useParams()
    const [deleteVisible, setDeleteVisible] = useState(false)
    // const [editVisible, setEditVisible] = useState(false)
    const [img, setImg] = useState()
    const { user } = useContext(Context);

     useEffect(() => {
         fetchOneArt(id).then(data => {
             setArt(data)
             setImg(process.env.REACT_APP_API_URL + "arts/" + data.img)
         })
    }, [])

    
  return (
    <Container className='mt-3'>
        <Row>
            <Col md={8}>
                <Image className="w-100" src={img}/>
                <Row>
                    {art.imgs.map(imgs =>
                        <Col key={imgs} md={3} className="mt-2" onClick={() => {setImg(process.env.REACT_APP_API_URL + "arts/" +imgs)}}><Image className='w-100' src={process.env.REACT_APP_API_URL + "arts/" + imgs}/></Col>
                        )}
                </Row>
            </Col>
            <Col md={4}>
                <Row>
                        {art.artists.map(artists =>
                            <Row key={artists.id} style={{cursor: 'pointer'}} onClick={() => navigate(ARTIST_ROUTE + '/' + artists.id)}>
                                <h6>{artists.name}</h6>
                            </Row>
                        )}
                </Row>

                <Row><h2>{art.name}</h2></Row>
                <Row><h6>{art.about}</h6></Row>
                <Row><h5>{art.city}</h5></Row>
                <Row><h5>{art.year}</h5></Row>
                <Row>
                    {art.properties.map(properties =>
                            <Row key={properties.id}>
                                <h6>{properties.title}: {properties.description}</h6>
                            </Row>
                        )}
                </Row>

                 {!user.artists.some(({ id }) => art.artists.some((a) => a.id === id)) || <Row>
                     <Button
                        className='mt-2 mb-2'
                        variant="outline-danger"
                        onClick={() => setDeleteVisible(true)}
                        >
                        Удалить
                    </Button>
                    {/* <Button
                        className='mt-2 mb-2'
                        variant="outline-dark"
                        onClick={() => setEditVisible(true)}
                        >
                        Редактировать
                    </Button> */}
                </Row>}
            </Col>
        </Row>
        <DeleteArt show={deleteVisible} onHide={() => setDeleteVisible(false)}/>
        {/* <EditArt show={editVisible} onHide={() => setEditVisible(false)}/> */}
    </Container>
    
  )
})
