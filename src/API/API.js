import axios from 'axios'
import MoviePage from './../pages/MoviePage'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

const APIKey = '91728d8f7faa03ab1aa227e642da7984'

export const profileAPI = {
  async getContent(keyword, currentPage) {
    if (keyword === '') {
      return ''
    } else {
      const response = await instance
        .get(
          `search/movie?api_key=${APIKey}&language=ru-RU&query=${keyword}&page=${currentPage}&include_adult=false`,
        )
        .catch((e) => {
          console.log(e)
        })
      return response.data.results
    }
  },

  async getTotalPages(keyword) {
    if (keyword === '') {
      return ''
    } else {
      const response = await instance
        .get(
          `search/movie?api_key=${APIKey}&language=ru-RU&query=${keyword}&page=1&include_adult=false`,
        )
        .catch((e) => {
          console.log(e)
        })
      return response.data.total_pages
    }
  },
}

export const moviePage = {
  async getMovieDescribe(movieId) {
    const response = await instance
      .get(`movie/${movieId}?api_key=${APIKey}&language=ru-RU`)
      .catch((e) => {
        console.log(e)
      })
    return response.data
  },
  async getMovieAgeLimit(movieId) {
    const response = await instance
      .get(`movie/${movieId}/release_dates?api_key=${APIKey}&language=ru-RU`)
      .catch((e) => {
        console.log(e)
      })
    return response.data
  },
}
