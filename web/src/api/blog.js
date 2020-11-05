import HTTP from '../utils/axios'
const axios = new HTTP()


export const getArticleList = data =>
  axios.get('/api/article/getArticleList', data)

export const getArticleById = data =>
  axios.get('/api/article/getArticleById', data)

