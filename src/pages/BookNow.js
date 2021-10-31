import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import swal from 'sweetalert'
import Meta from '../components/Meta'
const BookNow = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const [data, setData] = useState({})

  useEffect(() => {
    const url = `https://bloodcurdling-flesh-40992.herokuapp.com/allTouristPlace/${id}`
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [id])

  const { register, handleSubmit, reset } = useForm()
  //handle submit form

  const onSubmit = async (data) => {
    await axios
      .post(`https://bloodcurdling-flesh-40992.herokuapp.com/addTouristOrder`, {
        email: user?.email,
        address: data.address,
        city: data.city,
        country: data.country,
        date: data.date,
        postalcode: data.postalcode,
        price: data.price,
        pending: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          swal('Good job!', 'Your Order is Placed', 'success')
          reset()
        }
      })
  }
  return (
    <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <>
        <Meta title={data.title} />
        <Row>
          <Col md={4} className='my-4'>
            <Image src={data.image} alt={data.name} fluid />
          </Col>

          <Col md={3} className='my-4'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Title: {data.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Description: {data.description}</ListGroup.Item>
              <ListGroup.Item>Price:{data.price}$</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={5} className='my-4'>
            <h1 className='my-2'>Enter Your Information</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextAdress'
              >
                <Form.Label column sm='2'>
                  Address
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    defaultValue='10 evanue london'
                    {...register('address')}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextCity'
              >
                <Form.Label column sm='2'>
                  City
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Enter City'
                    {...register('city')}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPostalCode'
              >
                <Form.Label column sm='2'>
                  Postal Code
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Enter Postal Code'
                    {...register('postalcode')}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextCountry'
              >
                <Form.Label column sm='2'>
                  Country
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Enter Country'
                    {...register('country')}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPrice'
              >
                <Form.Label column sm='2'>
                  Price
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Enter Price'
                    {...register('price')}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPrice'
              >
                <Form.Label column sm='2'>
                  Date
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='date'
                    placeholder='Enter Price'
                    {...register('date')}
                  />
                </Col>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Book Now
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    </Container>
  )
}

export default BookNow
