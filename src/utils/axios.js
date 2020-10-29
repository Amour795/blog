
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL:'http://localhost:3000/',
  // 请求超时时间
  timeout: 10000,
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

class HTTP {
  constructor (baseURL) {
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