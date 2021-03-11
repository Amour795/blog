import HTTP from '../utils/axios'
const axios = new HTTP()


export const saveBlog = data =>
  axios.post('/api/admin/save', data)

export const getArticleList = data =>
  axios.get('/api/admin/getArticleList', data)

export const getArticleById = data =>
  axios.get('/api/admin/getArticleById', data)

export const deleteArticleById = data =>
  axios.post('/api/admin/deleteArticleById', data)
