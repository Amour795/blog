import HTTP from '../utils/axios'
const axios = new HTTP()


export const saveBlog = data =>
axios.post('/admin/save', data)

export const getArticleList = data =>
axios.get('/admin/getArticleList', data)

export const getArticleById = data =>
axios.get('/admin/getArticleById', data)

export const deleteArticleById = data =>
axios.post('/admin/deleteArticleById', data)
