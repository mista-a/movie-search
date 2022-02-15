import axios from 'axios'

const themoviedb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

const APIKey = '91728d8f7faa03ab1aa227e642da7984'

export const authenticationAPI = {
  async getNewToken() {
    const response = await themoviedb
      .get(`authentication/token/new?api_key=${APIKey}`)
      .catch((error) => console.log(error.response.data))
    return response.data.request_token
  },

  async postValidate(username, password, request_token) {
    await themoviedb
      .post(`authentication/token/validate_with_login?api_key=${APIKey}`, {
        username,
        password,
        request_token,
      })
      .catch((error) => console.log(error.response.data))
  },

  async createNewSession(request_token) {
    const response = await themoviedb
      .post(`authentication/session/new?api_key=${APIKey}`, {
        request_token,
      })
      .catch((error) => console.log(error.response.data))
    return response.data.session_id
  },
}

export const languageAPI = {
  async getGeo() {
    const response = await axios
      .get('https://ipapi.co/json/')
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getTranslations() {
    const response = await themoviedb
      .get(`configuration/primary_translations?api_key=${APIKey}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}

export const profileAPI = {
  async getContent(keyword, currentPage, language = 'en', adult = 'false') {
    const response = await themoviedb
      .get(
        `search/multi?api_key=${APIKey}&language=${language}&query=${keyword}&page=${currentPage}&include_adult=${adult}`,
      )
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}

export const movieAPI = {
  async getDescription(type, id, language) {
    const response = await themoviedb
      .get(`${type}/${id}?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getMovieAgeLimit(id) {
    const response = await themoviedb
      .get(`movie/${id}/release_dates?api_key=${APIKey}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getTvAgeLimit(id) {
    const response = await themoviedb
      .get(`tv/${id}/release_dates?api_key=${APIKey}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getCredits(type, id, language) {
    const response = await themoviedb
      .get(`${type}/${id}/credits?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getTrailer(type, id, language) {
    let response = await themoviedb
      .get(`${type}/${id}/videos?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    if (response.data.results.length > 0) {
      return response.data
    } else {
      response = await themoviedb
        .get(`${type}/${id}/videos?api_key=${APIKey}&language=en`)
        .catch((error) => console.log(error.response.data))
      return response.data
    }
  },

  async postRating(id, value) {
    await themoviedb
      .post(
        `movie/${id}/rating?api_key=${APIKey}`,
        { value },
        { 'Content-Type': 'application/json;charset=utf-8' },
      )
      .catch((error) => console.log(error.response.data))
  },
}

export const listsAPI = {
  async addToWatchList(type, id, sessionId, watchlist) {
    await themoviedb
      .post(
        `account/{account_id}/watchlist?api_key=${APIKey}&session_id=${sessionId}`,
        {
          media_type: type,
          media_id: id,
          watchlist: watchlist,
        },
        { 'Content-Type': 'application/json;charset=utf-8' },
      )
      .catch((error) => console.log(error.response.data))
  },

  async getWatchList(accountId, sessionId, language, page) {
    const response = await themoviedb
      .get(
        `account/${accountId}/watchlist/movies?api_key=${APIKey}&language=${language}&session_id=${sessionId}&page=${page}`,
      )
      .catch((error) => console.log(error.response.data))

    return response.data
  },
}

export const personAPI = {
  async getPersonDescribe(id, language = 'en') {
    const response = await themoviedb
      .get(`person/${id}?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },

  async getPersonCredits(id, language = 'en') {
    const response = await themoviedb
      .get(
        `person/${id}/combined_credits?api_key=${APIKey}&language=${language}`,
      )
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}

export const accountAPI = {
  async getAccountDetails(id) {
    const response = await themoviedb
      .get(`account?api_key=${APIKey}&session_id=${id}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}

export const genersAPI = {
  async getGeners(language) {
    const response = await themoviedb
      .get(`genre/movie/list?api_key=${APIKey}&language=${language}`)
      .catch((error) => console.log(error.response.data))
    return response.data
  },
}
