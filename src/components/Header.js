import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { user, logOut } = useAuth()
  return (
    <Navbar
      bg='success'
      variant='dark'
      expand='lg'
      sticky='top'
      className='text-uppercase'
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img
              src='around.png'
              alt=''
              style={{ width: '40px', height: '40px' }}
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='ms-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {user.email ? (
              <NavDropdown title={user?.email} id='nav-dropdown'>
                <LinkContainer to='/addTouristPlace'>
                  <NavDropdown.Item>Add Tourist Place</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/GetAllTouristPlace'>
                  <NavDropdown.Item>Get All Tourist Place</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user' aria-hidden='true'></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
