import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Gallery = () => {
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.get('https://bloodcurdling-flesh-40992.herokuapp.com/gallery')

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleDragStart = (e) => e.preventDefault()
  return (
    <section id='gallery' className='my-5'>
      <div className='container'>
        <h1 className='text-center text-uppercase'>
          <span>Gallery</span>
        </h1>
      </div>
      <div className='container my-5'>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>
            {<div>Something went wrong ...</div>}
          </Message>
        ) : (
          <AliceCarousel autoPlay autoPlayInterval='3000'>
            {data.map((x) => (
              <img
                key={x._id}
                src={x.original}
                className='sliderimg'
                onDragStart={handleDragStart}
                    alt={x.original}

              />
            ))}
          </AliceCarousel>
        )}
      </div>
    </section>
  )
}

export default Gallery
