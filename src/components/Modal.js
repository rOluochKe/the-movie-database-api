import React, { useState, useEffect } from 'react'
import axios from 'axios'
import closeIcon from '../images/close-icon.svg'

const noImageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const nullImageUrl = 'https://image.tmdb.org/t/p/originalnull'

const Modal = ({ children, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [movieDetail, setMovieDetail] = useState()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const fetchMovieDetail = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
    )
    setMovieDetail(data)
  }

  useEffect(() => {
    fetchMovieDetail()
    return () => {
      setMovieDetail({}) // unmounting
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div onClick={openModal}>{children}</div>
      <div
        className={`${
          isModalOpen ? 'modal-container isOpen' : 'modal-container'
        }`}
      >
        {movieDetail && (
          <div className='modal-content'>
            <div className='d-flex justify-content-between align-content-center'>
              <div>
                <h5>{movieDetail.title}</h5>
              </div>
              <div>
                <img
                  src={closeIcon}
                  alt='close icon'
                  className='close-modal'
                  onClick={closeModal}
                />
              </div>
            </div>
            <div className='row small-screens'>
              <div className='col-md-6 col-sm-6 mobile-screen'>
                <img
                  src={
                    `${process.env.REACT_APP_API_BASE_IMAGE_URL}${movieDetail.poster_path}` ===
                    nullImageUrl
                      ? noImageUrl
                      : `${process.env.REACT_APP_API_BASE_IMAGE_URL}${movieDetail.poster_path}`
                  }
                  className='img-fluid'
                  alt={movieDetail.title}
                />
              </div>
              <div className='col-md-6 col-sm-6'>
                <p className='mt-1'>
                  <strong>Release Date:</strong>{' '}
                  {`${new Date(`${movieDetail.release_date}`)
                    .toString()
                    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2, $3')}`}
                </p>
                <p>{movieDetail.overview}</p>
                <p>
                  <strong>{movieDetail.vote_average}</strong> / 10 (
                  {movieDetail.vote_count} total votes)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Modal
