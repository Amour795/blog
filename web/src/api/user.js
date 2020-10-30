import HTTP from '../utils/axios'
const axios = new HTTP()


export const userLogin = data =>
axios.post('/user/login', data)

export const userRegister = data =>
axios.post('/user/register', data)