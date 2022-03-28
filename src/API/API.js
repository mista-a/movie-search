import axios from 'axios'

const themoviedb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

const APIKey = '91728d8f7faa03ab1aa227e642da7984'

const logError = (error) => {
  console.log(error.response.data)
}

export const authenticationAPI = {
  async getNewToken() {
    const response = await themoviedb
      .get(`authentication/token/new?api_key=${APIKey}`)
      .catch(logError)
    return response.data.request_token
  },

  async postValidate(username, password, request_token) {
    await themoviedb
      .post(`authentication/token/validate_with_login?api_key=${APIKey}`, {
        username,
        password,
        request_token,
      })
      .catch(logError)
  },

  async createNewSession(request_token) {
    const response = await themoviedb
      .post(`authentication/session/new?api_key=${APIKey}`, {
        request_token,
      })
      .catch(logError)
    return response.data.session_id
  },
}

export const languageAPI = {
  async getGeo() {
    const response = await axios.get('https://ipapi.co/json/').catch(logError)
    return response.data
  },

  async getTranslations() {
    const response = await themoviedb
      .get(`configuration/primary_translations?api_key=${APIKey}`)
      .catch(logError)
    return response.data
  },
}

export const searchAPI = {
  // adult
  async getContent(keyword, currentPage, language = 'en') {
    const response = await themoviedb
      .get(
        `search/multi?api_key=${APIKey}&language=${language}&query=${keyword}&page=${currentPage}&include_adult=false`,
      )
      .catch(logError)
    return response.data
  },

  async getTopTitles(page, language = 'en') {
    const movieResponse = await themoviedb
      .get(
        `movie/top_rated?api_key=${APIKey}&language=${language}&page=${page}`,
      )
      .catch(logError)
    movieResponse.data.results.forEach((result) => {
      result.media_type = 'movie'
    })

    const tvResponse = await themoviedb
      .get(`tv/top_rated?api_key=${APIKey}&language=${language}&page=${page}`)
      .catch(logError)
    tvResponse.data.results.forEach((result) => {
      result.media_type = 'tv'
    })

    const response = {}
    response.page = page
    response.results = [
      ...movieResponse.data.results,
      ...tvResponse.data.results,
    ]
    response.total_pages =
      movieResponse.data.total_pages + tvResponse.data.total_pages
    response.total_results =
      movieResponse.data.total_results + tvResponse.data.total_results
    return response
  },
}

export const titleAPI = {
  async getDescription(titleType, titleId, language) {
    const response = await themoviedb
      .get(`${titleType}/${titleId}?api_key=${APIKey}&language=${language}`)
      .catch(logError)
    return response.data
  },

  async getAgeLimit(titleType, titleId) {
    const response = await themoviedb
      .get(`${titleType}/${titleId}/release_dates?api_key=${APIKey}`)
      .catch(logError)
    return response.data
  },

  async getCredits(titleType, titleId, language) {
    const response = await themoviedb
      .get(
        `${titleType}/${titleId}/credits?api_key=${APIKey}&language=${language}`,
      )
      .catch(logError)
    return response.data
  },

  async getTrailers(titleType, titleId, language) {
    let response = await themoviedb
      .get(
        `${titleType}/${titleId}/videos?api_key=${APIKey}&language=${language}`,
      )
      .catch(logError)
    if (response.data.results.length > 0) {
      return response.data
    } else {
      response = await themoviedb
        .get(`${titleType}/${titleId}/videos?api_key=${APIKey}&language=en`)
        .catch(logError)
      return response.data
    }
  },

  //fix Zобеденить postRating и addToWatchList в один раздел

  async postRating(titleType, titleId, value, sessionId) {
    await themoviedb
      .post(
        `${titleType}/${titleId}/rating?api_key=${APIKey}&session_id=${sessionId}`,
        { value },
        { 'Content-Type': 'application/json;charset=utf-8' },
      )
      .catch(logError)
  },
}

export const listsAPI = {
  async addToWatchList(type, titleId, sessionId) {
    await themoviedb
      .post(
        `account/{account_id}/watchlist?api_key=${APIKey}&session_id=${sessionId}`,
        {
          media_type: type,
          media_id: titleId,
          watchlist: true,
        },
        { 'Content-Type': 'application/json;charset=utf-8' },
      )
      .catch(logError)
  },

  async getWatchList(accountId, sessionId, language, page) {
    const response = await themoviedb
      .get(
        `account/${accountId}/watchlist/movies?api_key=${APIKey}&language=${language}&session_id=${sessionId}&page=${page}`,
      )
      .catch(logError)

    return response.data
  },

  async rateTitle(titleType, titleId, rate) {
    await themoviedb.post(`${titleType}/${titleId}/rating?api_key=${APIKey}`, {
      value: rate,
    })
  },
}

export const personAPI = {
  async getPersonDescribe(personId, language = 'en') {
    const response = await themoviedb
      .get(`person/${personId}?api_key=${APIKey}&language=${language}`)
      .catch(logError)
    return response.data
  },

  async getPersonCredits(personId, language = 'en') {
    const response = await themoviedb
      .get(
        `person/${personId}/combined_credits?api_key=${APIKey}&language=${language}`,
      )
      .catch(logError)
    return response.data
  },
}

export const accountAPI = {
  async getAccountDetails(sessionId) {
    const response = await themoviedb
      .get(`account?api_key=${APIKey}&session_id=${sessionId}`)
      .catch(logError)
    return response.data
  },
}

export const genersAPI = {
  async getGeners(language) {
    const response = await themoviedb
      .get(`genre/movie/list?api_key=${APIKey}&language=${language}`)
      .catch(logError)
    return response.data
  },
}
