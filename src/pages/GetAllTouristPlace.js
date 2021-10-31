import Button from '@restart/ui/esm/Button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import swal from 'sweetalert'

const GetAllTouristPlace = () => {
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.get('http://localhost:5000/allTouristPlace/')

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const deleteHandler = (id) => {
      const url = `http://localhost:5000/deleteTouristInfo/${id}`
      fetch(url, {
          method: 'DELETE'
      }).then(res => res.json()).then(d => {
          if (d.deletedCount) {
              swal('Are you sure you want to delete this?', {
                buttons: ['NO!', 'Yes!'],
              })
            const remaining = data.filter((s) => s._id !== id)
            setData(remaining)
          }
      })
  }
  return (
    <div className='container'>
      <h1 className='text-center text-uppercase mb-3'>Get All Toursit Place</h1>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {<div>Something went wrong ...</div>}
        </Message>
      ) : (
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>IMAGE</th>
              <th>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.title}</td>
                <td>
                  <img
                    src={x.image}
                    alt={x.image}
                    style={{ width: '3rem', height: '3rem' }}
                  />
                </td>
                <td>{x.description}</td>
                <td>
                  <LinkContainer to={`/getAllTouristPlace/${x._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(x._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
                {/* <td>
                    <a href={`mailto:${x.email}`}>{x.email}</a>
                  </td>
                  <td>
                    {x.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${x._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(x._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default GetAllTouristPlace
