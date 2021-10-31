import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'
import { Link, useHistory, useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import swal from 'sweetalert'
import axios from 'axios'
export default function SignUp() {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { createAccountWithGoogle, setUser, setIsLoading, updateName } =
    useAuth()

  const history = useHistory()
  const location = useLocation()
  const url = location.state?.from || '/home'
  //handle change
  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInput((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  //handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    await createAccountWithGoogle(userInput.email, userInput.password)
      .then((res) => {
        setIsLoading(true)
        updateName(userInput.name)
        setUser(res.user)

        history.push(url)
      })
      .catch((error) => {
        swal('Something went wrong!', `${error.message}`, 'error')
      })
      .finally(() => {
        setIsLoading(false)
      })
    await axios
      .post(`https://bloodcurdling-flesh-40992.herokuapp.com/addTourist`, {
        name: userInput.name,
        email: userInput.email,
      })
      .then((res) => {
        if (res.data.insertedId) {
          swal('Good job!', 'Account has been created!', 'success')
        }
      })
  }
  //form inputs
  const Inputs = [
    {
      id: 1,
      type: 'text',
      placeholder: 'Name',
      value: `${userInput.name}`,
      name: 'name',
    },
    {
      id: 2,
      type: 'email',
      placeholder: 'Email',
      value: `${userInput.email}`,
      name: 'email',
    },
    {
      id: 3,
      type: 'password',
      placeholder: 'Password',
      value: `${userInput.password}`,
      name: 'password',
    },
  ]

  return (
    <div className='mt-5'>
      <FormContainer>
        <h1 className='text-center'>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          {Inputs.map((input) => (
            <Form.Group controlId={input.name} key={input.id}>
              <Form.Label>{input.name.toUpperCase()}</Form.Label>
              <Form.Control
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                name={input.name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          ))}
          <Button type='submit' variant='primary' className='mt-3 text-center'>
            Sign Up
          </Button>
          <br />
        </Form>

        <Row className='py-3'>
          <Col>
            <Link to='/login'>
              <p className='text-primary text-center my-5'>
                Already have an account ? SignIn
              </p>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}
