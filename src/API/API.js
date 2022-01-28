import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

const APIKey = '91728d8f7faa03ab1aa227e642da7984'

export const profileAPI = {
  //fix getProfileContent
  async getContent(keyword, currentPage, language = 'en-US', adult = 'false') {
    const response = await instance
      .get(
        `search/multi?api_key=${APIKey}&language=${language}&query=${keyword}&page=${currentPage}&include_adult=${adult}`
      )
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}

export const movieAPI = {
  async getDescription(type, id) {
    const response = await instance
      .get(`${type}/${id}?api_key=${APIKey}&language=ru-RU`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getMovieAgeLimit(id) {
    const response = await instance
      .get(`movie/${id}/release_dates?api_key=${APIKey}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getTvAgeLimit(id) {
    const response = await instance
      .get(`tv/${id}/release_dates?api_key=${APIKey}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getCredits(type, id) {
    const response = await instance
      .get(`${type}/${id}/credits?api_key=${APIKey}&language=ru-RU`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getTrailer(type, id, language = 'en-En') {
    const response = await instance
      .get(`${type}/${id}/videos?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}

export const PersonAPI = {
  async getPersonDescribe(id, language = 'en-En') {
    const response = await instance
      .get(`person/${id}?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getPersonCredits(id, language = 'en-En') {
    const response = await instance
      .get(
        `person/${id}/combined_credits?api_key=${APIKey}&language=${language}`
      )
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}
