import HTTP from '../utils/axios'
const axios = new HTTP()


export const getArticleList = data =>
axios.get('/article/getArticleList', data)

export const getArticleById = data =>
axios.get('/article/getArticleById', data)

