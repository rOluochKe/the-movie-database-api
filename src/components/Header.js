import React from 'react'
import SearchForm from './SearchForm'
// import logo from '../images/logo.svg'

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <div className='container'>
        {/* <img
          src={logo}
          className='navbar-brand logo'
          alt='The Movie Database API'
        /> */}
        <h3>TMDB-API</h3>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarScroll'
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarScroll'>
          <SearchForm />
        </div>
      </div>
    </nav>
  )
}

export default Header
