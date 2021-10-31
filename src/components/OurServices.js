import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
const OurServices = ({ services }) => {
  return (
    <Col xs={12} sm={12} md={4} key={services._id}>
      <Card border='primary'>
        <Card.Img
          variant='top'
          src={services.image}
          alt={services.image}
          style={{ height: '15rem' }}
        />
        <Card.Body>
          <Card.Title>{services.title}</Card.Title>
          <Card.Text> {services.description.slice(0, 30) + '...'}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link>
            <div className='d-grid gap-2'>
              <button className='btn btn-primary' type='button'>
                Button
              </button>
            </div>
          </Link>
        </Card.Footer>
      </Card>
      <br />
    </Col>
  )
}

export default OurServices
