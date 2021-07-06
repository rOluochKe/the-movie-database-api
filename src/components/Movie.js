import React from 'react'
import Modal from './Modal'

const noImageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const nullImageUrl = 'https://image.tmdb.org/t/p/originalnull'

export default function Movie({
  id,
  title,
  vote_average: rating,
  poster_path: image,
}) {
  return (
    <div className='col-md-4 col-sm-12 col-lg-3 mb-4'>
      <Modal id={id}>
        <div className='card h-100'>
          <span className='rating'>{rating}</span>
          <img
            src={
              `${process.env.REACT_APP_API_BASE_IMAGE_URL}${image}` ===
              nullImageUrl
                ? noImageUrl
                : `${process.env.REACT_APP_API_BASE_IMAGE_URL}${image}`
            }
            className='card-img-top'
            alt={title}
          />
          <div className='card-body'>
            <p className='text-center mb-0'>{title}</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
