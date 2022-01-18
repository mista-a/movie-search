import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

const APIKey = '91728d8f7faa03ab1aa227e642da7984'

export const profileAPI = {
  async getContent(keyword, currentPage, language = 'en-US', adult = 'false') {
    const response = await instance
      .get(
        `search/multi?api_key=${APIKey}&language=${language}&query=${keyword}&page=${currentPage}&include_adult=${adult}`,
      )
      .catch((e) => {
        console.log(e)
      })
    return response.data
  },
}

export const moviePage = {
  async getMovieDescribe(type, id) {
    const response = await instance
      .get(`${type}/${id}?api_key=${APIKey}&language=ru-RU`)
      .catch((e) => console.log(e))
    return response.data
  },

  async getMovieAgeLimit(type, id) {
    const response = await instance
      .get(`${type}/${id}/release_dates?api_key=${APIKey}&language=ru-RU`)
      .catch((e) => console.log(e))
    return response.data
  },
}
