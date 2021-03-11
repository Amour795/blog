import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.VUE_APP_BASE_URL,
  // 请求超时时间
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    if (localStorage.getItem('TOKEN')) {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('TOKEN')
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)


// 添加响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      window.location.replace(`${window.location.origin}/admin`);
    }
    return Promise.reject(error)
  }
)

class HTTP {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  get (url, param) {
    return service.get(url, { params: param, baseURL: this.baseURL })
  }
  post (url, params, config = {}) {
    return service.post(url, params, { baseURL: this.baseURL, ...config })
  }
}
export default HTTP