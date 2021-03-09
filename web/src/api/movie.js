import HTTP from '../utils/axios'
const axios = new HTTP()

export const getMovieList = data =>
  axios.get('/api/movie/getList', data)

export const getMovieDetails = data =>
  axios.get('/api/movie/getDetails', data)




