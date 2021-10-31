import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useFirebase from '../hooks/useFirebase'
import axios from 'axios'
import swal from 'sweetalert'
const ContactUsPage = () => {
  const { user } = useFirebase()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    await axios
      .post(`http://localhost:5000/contactUs`, {
        email: user?.email,
        address: data.address,
        mobile: data.mobile,
        message: data.message,
      })
      .then((res) => {
        if (res.data.insertedId) {
          swal('Thank You', 'We will react leter', 'success')
          reset()
        }
      })
  }
  return (
    <FormContainer>
      <h1 className='text-uppercase text-center'>Contact Us</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            {...register('address', { required: true })}
            placeholder='Input your address'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='mobile' className='my-2'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='mobile'
            {...register('mobile')}
            placeholder='Input your mobile number'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='message' className='my-2'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            type='message'
            {...register('message')}
            placeholder='Feel free to form'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
           Contact Us
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ContactUsPage
