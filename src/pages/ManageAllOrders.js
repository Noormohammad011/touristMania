import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import swal from 'sweetalert'
import axios from 'axios'
const ManageAllOrders = () => {
    const [data, setData] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false)
        setIsLoading(true)

        try {
          const result = await axios.get(`http://localhost:5000/allOrders`)

          setData(result.data)
        } catch (error) {
          setIsError(true)
        }

        setIsLoading(false)
      }

      fetchData()
    }, [])

    const deleteHandler = (id) => {
      const url = `http://localhost:5000/allOrders/${id}`
      fetch(url, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((d) => {
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
      <h1 className='text-center text-uppercase mb-3'>Get All Orders</h1>

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
              <th>EMAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.email}</td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(x._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default ManageAllOrders
