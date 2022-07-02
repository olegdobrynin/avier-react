import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import {observer} from "mobx-react-lite"
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CreateArt from './modals/CreateArt'

const NavBar = observer( () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {art} = useContext(Context)
    const [artVisible, setArtVisible] = useState(false)
    art.setSelectedType(0)

    const logOut = () => {
      user.setIsAuth(false)
      localStorage.setItem('token', '')
      navigate(MAIN_ROUTE);
    }

    const logo = () => {
      art.setSelectedType(0)
      navigate(MAIN_ROUTE)
    }

  return (
    <Navbar bg="light" variant="light" >
    <Container>
    <Navbar.Brand onClick={() => logo() }>
    <img
        src="/logo330x100.png"
        width="132"
        height="40"
        className="d-inline-block align-top"
        alt="Avier"
      />
    </Navbar.Brand>

    {user.isAuth ?
        <Nav className="ml-auto">

            <NavDropdown
            id="nav-dropdown"
            title={user.userInfo.login}
            menuVariant="white"
          >
            <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>Художники</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setArtVisible(true)}>Добавить арт</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
        </Nav>
      :
        <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</Nav.Link>
            <Nav.Link onClick={() => navigate(LOGIN_ROUTE)}>Войти</Nav.Link>
        </Nav>
    }
    <CreateArt show={artVisible} onHide={() => setArtVisible(false)}/>
    </Container>
  </Navbar>

  )
})

export default NavBar;
