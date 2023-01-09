import axios, { AxiosRequestConfig } from 'axios'
import { useLogin } from '@store'

const instance = axios.create({
  baseURL: 'http://api.h5ke.top/',
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  (conf) =>
    Object.assign(conf, {
      headers: { authorization: useLogin().token },
    }),
  (error) => {
    console.log('请求失败')
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.errmsg === 'token error') {
      ElMessage({ type: 'error', message: 'Token 无效' })
      useLogin().delToken()
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    }
    return response.data
  },
  // 对响应数据做点什么
  (error) => {
    console.log('响应失败')
    return Promise.reject(error)
  }
)
interface Data {
  [index: string]: unknown
}

export type Result = {
  errcode?: number
  errmsg?: string
}

interface Http {
  get: <T = any>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<T & Result>
  post: <T = any>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<T & Result>
  put: <T = any>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<T & Result>
  patch: <T = any>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<T & Result>
  delete: <T = any>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ) => Promise<T & Result>
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
