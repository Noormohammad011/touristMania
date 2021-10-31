import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'

import { Form, Button } from 'react-bootstrap'

import swal from 'sweetalert'

const EditTouristPlace = ({ match, history }) => {
  const [data, setData] = useState({})
  useEffect(() => {
    const url = `http://localhost:5000/allTouristPlace/${match.params.id}`
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [match.params.id])
  

  // Update TravelLocation
  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value
    const updatedLocation = {
      title: updatedTitle,
      description: data.description,
      image: data.image,
      price: data.price,
    }
    setData(updatedLocation)
  }

  const handleDescriptionChange = (e) => {
    const updatedDescription = e.target.value
    const updatedLocation = {
      title: data.title,
      description: updatedDescription,
      image: data.image,
      price: data.price,
    }
    setData(updatedLocation)
  }
  const handleImageChange = (e) => {
    const updatedImage = e.target.value
    const updatedLocation = {
      title: data.title,
      description: data.description,
      image: updatedImage,
      price: data.price
    }
    setData(updatedLocation)
  }
  const handlePriceChange = (e) => {
    const updatedPrice = e.target.value
    const updatedLocation = {
      title: data.title,
      description: data.description,
      image:data.image,
      price: updatedPrice,
    }
    setData(updatedLocation)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const url = `http://localhost:5000/allTouristPlace/${match.params.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal('Thank You', 'Editing This Place', 'success')
          setData({})
            e.target.reset()
            history.push('/')
        }
      })
  }

  return (
    <FormContainer>
      <h1 className='text-uppercase text-center'>
        Edit Tourist Place
      </h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='title' className='my-2'>
          <Form.Label>Place Title</Form.Label>
          <Form.Control
            type='title'
            onChange={handleTitleChange}
            value={data?.title || ''}
            placeholder='Place Title'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='description' className='my-2'>
          <Form.Label>Place Description</Form.Label>
          <Form.Control
            type='description'
            onChange={handleDescriptionChange}
            value={data?.description || ''}
            placeholder='Place Description'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text' className='my-2'>
          <Form.Label>Place Image</Form.Label>
          <Form.Control
            type='text'
            onChange={handleImageChange}
            value={data?.image || ''}
            placeholder='Image Link'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text' className='my-2'>
          <Form.Label>Place Image</Form.Label>
          <Form.Control
            type='text'
            onChange={handlePriceChange}
            value={data?.price || ''}
            placeholder='Price'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          Update Place
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EditTouristPlace
