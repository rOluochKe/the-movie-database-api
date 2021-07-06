import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

// Latest Movies
const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
// Query Search
const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')

  // Fetch movies based on user search
  const fetchMovies = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios(
        `${API_ENDPOINT}&query=${query}&language=en-US`
      )
      const data = response.data.results

      if (data) {
        setMovies(data)
      } else {
        setMovies([])
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [query])

  // Fetch default movies
  const fetchDefaultMovies = async () => {
    setIsLoading(true)

    try {
      const defaultResponse = await axios(`${NOW_PLAYING}`)
      const defaultData = defaultResponse.data.results

      if (defaultData) {
        setMovies(defaultData)
      } else {
        setMovies([])
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (query === '') {
      fetchDefaultMovies()
    } else {
      fetchMovies()
    }
    // eslint-disable-next-line
  }, [query])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        movies,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
