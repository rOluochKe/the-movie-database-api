import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { query, setQuery } = useGlobalContext()

  return (
    <form className='d-flex ms-auto py-0' onSubmit={(e) => e.preventDefault()}>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Search for a movie'
        aria-label='Search for a movie'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchForm
