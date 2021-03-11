import HTTP from '../utils/axios'
const axios = new HTTP()


export const saveMessage = data =>
  axios.post('/api/message/save', data)

export const getMessageList = articleId =>
  axios.get('/api/message/getList', {
    articleId: articleId
  })