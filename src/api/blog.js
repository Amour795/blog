import HTTP from '../utils/axios'
const axios = new HTTP()


export const saveBlog = data =>
axios.post('/article/save', data)


export const getArticleList = data =>
axios.get('/article/getArticleList', data)

export const getArticleById = data =>
axios.get('/article/getArticleById', data)

