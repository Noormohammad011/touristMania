import React from 'react'
import FormContainer from '../components/FormContainer'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'
const AddTouristPlace = () => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const onSubmit = async (data) => {
    await axios
      .post(`http://localhost:5000/addTouristPlace`, data)
      .then((res) => {
        if (res.data.insertedId) {
            swal('Thank You', 'Adding New Place', 'success')
            reset()
        }
      })
  }

  return (
    <FormContainer>
      <h1 className='text-uppercase text-center'>Add Tourist Place</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='title' className='my-2'>
          <Form.Label>Place Title</Form.Label>
          <Form.Control
            type='title'
            {...register('title', { required: true })}
            placeholder='Place Title'
          ></Form.Control>
          
        </Form.Group>
        <Form.Group controlId='description' className='my-2'>
          <Form.Label>Place Description</Form.Label>
          <Form.Control
            type='description'
            {...register('description', { required: true })}
            placeholder='Place Description'
          ></Form.Control>
         
        </Form.Group>
        <Form.Group controlId='text' className='my-2'>
          <Form.Label>Place Image</Form.Label>
          <Form.Control
            type='text'
            {...register('image', { required: true })}
            placeholder='Image Link'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          Add Place
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddTouristPlace
