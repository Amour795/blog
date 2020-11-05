import HTTP from '../utils/axios'
const axios = new HTTP()


export const uploadFiles = formdata =>
  axios.post('/api/files/uploadFiles', formdata, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })