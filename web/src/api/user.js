import HTTP from '../utils/axios'
const axios = new HTTP()


export const userLogin = data =>
  axios.post('/api/user/login', data)

export const userRegister = data =>
  axios.post('/api/user/register', data)