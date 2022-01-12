import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

export const profileAPI = {
  async getContent(keyword, currentPage) {
    if (keyword === '') {
      return ''
    } else {
      const response = await instance.get(
        `search/movie?api_key=91728d8f7faa03ab1aa227e642da7984&language=ru-RU&query=${keyword}&page=${currentPage}&include_adult=false`,
      )
      // .catch(() => {
      //   console.log('123')
      // })
      return response.data.results
    }
  },

  async getTotalPages(keyword) {
    if (keyword === '') {
      return ''
    } else {
      const response = await instance.get(
        `search/movie?api_key=91728d8f7faa03ab1aa227e642da7984&language=ru-RU&query=${keyword}&page=1&include_adult=false`,
      )
      // .catch(() => {
      //   console.log('123')
      // })
      return response.data.total_pages
    }
  },
}
