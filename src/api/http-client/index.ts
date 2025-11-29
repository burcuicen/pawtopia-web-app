import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestWrapper } from '../interfaces'
import { to } from '../utils'

export class HttpClient {
  private API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  private axios: AxiosInstance

  constructor() {
    console.log('🚀 API Base URL:', this.API_BASE_URL)
    console.log('🔧 ENV Variable:', process.env.REACT_APP_API_BASE_URL)
    this.axios = this.createAxiosInstance()
  }

  private createAxiosInstance(): AxiosInstance {
    const axiosInstance = axios.create({ baseURL: this.API_BASE_URL })

    const onRequestFulFilled = (config: any): any => {
      const token = localStorage.getItem('token')
      if (token) config.headers['Authorization'] = `Bearer ${token}`

      return config
    }

    const onRequestRejected = (error: any): any => {
      return Promise.reject(error)
    }

    axiosInstance.interceptors.request.use(onRequestFulFilled, onRequestRejected)

    return axiosInstance
  }

  async request<T, E>(config: AxiosRequestConfig): Promise<RequestWrapper<T, E>> {
    const req = this.axios.request(config)

    const [err, res] = await to<AxiosResponse<T>, AxiosError<E>>(req)

    return { err, res }
  }

  // Public request without auth header (for public endpoints like /listing)
  async publicRequest<T, E>(config: AxiosRequestConfig): Promise<RequestWrapper<T, E>> {
    const publicAxios = axios.create({ baseURL: this.API_BASE_URL })
    const req = publicAxios.request(config)

    const [err, res] = await to<AxiosResponse<T>, AxiosError<E>>(req)

    return { err, res }
  }
}
