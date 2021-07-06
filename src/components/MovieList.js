import React from 'react'
import Loading from './Loading'
import { useGlobalContext } from '../context'
import Movie from './Movie'

const MovieList = () => {
  const { movies, isLoading } = useGlobalContext()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='container px-3 mb-5'>
      <hr />
      <h3 className='mt-5'>Most Recent Movies</h3>
      <div className='row'>
        {movies.map((movie) => {
          return <Movie key={movie.id} {...movie} />
        })}
      </div>
    </div>
  )
}

export default MovieList
