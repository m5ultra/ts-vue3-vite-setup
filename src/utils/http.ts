import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'http://api.h5ke.top/',
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  (conf) => {
    console.log(conf, '请求拦截器')
    return conf
  },
  (error) => {
    console.log(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => response.data,
  // 对响应数据做点什么
  (error) => {
    console.log('响应失败')
    return Promise.reject(error)
  }
)
interface Data {
  [index: string]: unknown
}
interface Http {
  get: (
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>
  post: (url: string, data: Data, config?: AxiosRequestConfig) => any
  put: (
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>
  patch: (
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>
  delete: (
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>
}

const http: Http = {
  get(url, data, config = {}) {
    return instance.get(url, {
      params: data,
      ...config,
    })
  },
  post(url, data, config = {}) {
    return instance.post(url, data, config)
  },
  put(url, data, config = {}) {
    return instance.put(url, data, config)
  },
  patch(url, data, config = {}) {
    return instance.patch(url, data, config)
  },
  delete(url, data, config = {}) {
    return instance.delete(url, {
      data,
      ...config,
    })
  },
}

export default http
