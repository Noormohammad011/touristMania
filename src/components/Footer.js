import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row className='text-center py-3 bg-primary text-white'>
          <Col className='d-flex flex-column justify-content-center align-items-center'>
            <p>For More Information</p>
            <p>
              <i className='fas fa-address-card fa-2x'>
                {' '}
                <span className='px-2'>Rajshai</span>{' '}
              </i>
            </p>
            <p>
              <i className='fas fa-mobile fa-2x'>
                {' '}
                <span className='px-2'>+01521421212</span>{' '}
              </i>
            </p>
          </Col>

          <Col className='d-flex justify-content-center align-items-center'>
            <i className='fab fa-facebook fa-2x px-3'></i>
            <i className='fab fa-google-plus fa-2x px-3'></i>
            <i className='fab fa-twitter fa-2x px-3'></i>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col className='text-center py-3 bg-dark text-white'>
            Copyright &copy; TouristMenia
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
