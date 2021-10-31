import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Faq = () => {
     const [data, setData] = useState([])

     const [isLoading, setIsLoading] = useState(false)
     const [isError, setIsError] = useState(false)

     useEffect(() => {
       const fetchData = async () => {
         setIsError(false)
         setIsLoading(true)

         try {
           const result = await axios.get('http://localhost:5000/faq')

           setData(result.data)
         } catch (error) {
           setIsError(true)
         }

         setIsLoading(false)
       }

       fetchData()
     }, [])
  return (
    <section className='my-5'>
      <div className='container'>
        <h1 className='text-center text-uppercase heading_title'>
          <span>General Question About Us</span>
        </h1>
      </div>

      <div className='container mt-4'>
        <Accordion defaultActiveKey='0' flush>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant='danger'>
              {<div>Something went wrong ...</div>}
            </Message>
          ) : (
            data?.map((x) => (
              <Accordion.Item eventKey={x._id}>
                <Accordion.Header>{x.accordian_header}</Accordion.Header>
                <Accordion.Body>{x.accordian_body}</Accordion.Body>
              </Accordion.Item>
            ))
          )}
        </Accordion>
      </div>
    </section>
  )
}

export default Faq
