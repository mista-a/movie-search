import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

const APIKey = '91728d8f7faa03ab1aa227e642da7984'

export const profileAPI = {
  async getContent(keyword, currentPage, language = 'en-US', adult = 'false') {
    const response = await instance.get(
      `search/multi?api_key=${APIKey}&language=${language}&query=${keyword}&page=${currentPage}&include_adult=${adult}`,
    )
    //.catch((e) => console.log(e))
    return response.data
  },
}

export const movieAPI = {
  async getMovieDescription(id, type) {
    const response = await instance.get(
      `${type}/${id}?api_key=${APIKey}&language=ru-RU`,
    )
    //.catch((e) => console.log(e));
    return response.data
  },

  async getMovieAgeLimit(id) {
    const response = await instance.get(
      `movie/${id}/release_dates?api_key=${APIKey}`,
    )
    //.catch((e) => console.log(e));
    return response.data
  },

  async getTvAgeLimit(id) {
    const response = await instance.get(
      `tv/${id}/release_dates?api_key=${APIKey}`,
    )
    //.catch((e) => console.log(e));
    return response.data
  },
}
