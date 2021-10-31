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
        const result = await axios.get(`https://bloodcurdling-flesh-40992.herokuapp.com/allOrders`)

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const deleteHandler = (id) => {
    const url = `https://bloodcurdling-flesh-40992.herokuapp.com/allOrders/${id}`
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
  const updateHandler = async (id) => {
      await axios.put(`https://bloodcurdling-flesh-40992.herokuapp.com/allOrders/${id}`, { pending: false })
     
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
              <th>ORDER STATUS</th>
              <th>ORDER STATUS CHANGED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.email}</td>
                <td>{x.pending ? <h4>Pending</h4> : <h4>Order Placed</h4>}</td>
                <td>
                  {' '}
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => updateHandler(x._id)}
                  >
                    <i className='far fa-edit'>Status</i>
                  </Button>
                </td>
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
