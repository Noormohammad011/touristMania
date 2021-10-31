import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import useAuth from '../hooks/useAuth'
import { HashLink } from 'react-router-hash-link'
const Header = () => {
  const { user, logOut } = useAuth()

    const scrollWithOffset = (el) => {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
      const yOffset = -100
      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
    }
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
            Travel
            <img
              src='around.png'
              alt=''
              style={{ width: '40px', height: '40px' }}
            />{' '}
            Menia
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='ms-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {user.email && (
              <>
                <LinkContainer to='/myOrder'>
                  <Nav.Link>
                    <i className='fas fa-cart-plus'> MyOrder</i>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/allOrder'>
                  <Nav.Link>AllOrders</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to='/contactUs'>
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/faq'>
              <Nav.Link>Faq</Nav.Link>
            </LinkContainer>
            <Nav.Link
              as={HashLink}
              smooth
              to='/home#about'
              scroll={(el) => scrollWithOffset(el)}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to='/home#gallery'
              smooth
              scroll={(el) => scrollWithOffset(el)}
            >
              Gallery
            </Nav.Link>
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
