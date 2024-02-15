import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'

export class AuthRepository {
  private httpClient: HttpClient
  private URL = ''

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }
  async getHello<T = any, E = any>(): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL
    }

    return await this.httpClient.request<T, E>(config)
  }

}