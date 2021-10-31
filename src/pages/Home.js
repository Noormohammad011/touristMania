import React, { useEffect , useState} from 'react'
import { Carousel, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import OurServices from '../components/OurServices'
import Loader from '../components/Loader'
import Message from '../components/Message'
const Home = () => {
  const [data, setData] = useState([])
    
    
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.get(
          'http://localhost:5000/allTouristPlace/'
        )

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])
  return (
    <>
      <Carousel className='d-none d-md-block'>
        {data.map((x) => (
          <Carousel.Item key={x._id} interval={750}>
            <img
              className='d-block'
              src={x.image}
              style={{ height: 600, width: '100%' }}
              alt={x.image}
            />
            <Carousel.Caption>
              <h3
                style={{ color: '#254358', fontFamily: 'Roboto' }}
                className='text-uppercase fs-2 fw-bold'
              >
                {x.title}
              </h3>
              <p style={{ color: 'black' }} className='text-uppercase fs-4'>
                {x.description}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        )).slice(0, 4)}
      </Carousel>
      <Container className='mt-5'>
        <Row className='mb-3'>
          <h1 className='text-center text-uppercase'>Our Services</h1>
        </Row>
        <Row>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant='danger'>
              {<div>Something went wrong ...</div>}
            </Message>
          ) : (
            data.map((x) => <OurServices services={x} />)
          )}
        </Row>
      </Container>
    </>
  )
}


export default Home
