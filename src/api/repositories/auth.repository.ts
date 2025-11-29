import { HttpClient } from '../http-client'

import type { AxiosRequestConfig } from 'axios'
import type { RequestWrapper } from '../interfaces/base'

import type { ILogin, ILoginResponse, IRegisterDto, IUser } from '../interfaces/user'

export class AuthRepository {
  private httpClient: HttpClient
  private URL = '/auth'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }
  async login<T = ILoginResponse, E = unknown>(body: ILogin): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.URL + '/login',
      data: body
    }

    return await this.httpClient.request<T, E>(config)
  }

  async register<T = IUser, E = unknown>(body: IRegisterDto): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.URL + '/register',
      data: body
    }

    return await this.httpClient.request<T, E>(config)
  }
  async getUserFromToken<T = IUser, E = unknown>(token: string): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/user',
      headers: { Authorization: `Bearer ${token}` }
    }

    return await this.httpClient.request<T, E>(config)
  }

  async getProfile<T = IUser, E = unknown>(): Promise<RequestWrapper<T, E>> {
    const token = localStorage.getItem('token')
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/profile',
      headers: { Authorization: `Bearer ${token}` }
    }

    return await this.httpClient.request<T, E>(config)
  }

  async updateProfile<T = IUser, E = unknown>(body: Partial<IUser>): Promise<RequestWrapper<T, E>> {
    const token = localStorage.getItem('token')
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: this.URL + '/profile',
      headers: { Authorization: `Bearer ${token}` },
      data: body
    }

    return await this.httpClient.request<T, E>(config)
  }

  async toggleFavorite<T = IUser, E = unknown>(listingId: string): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/user/favorites/' + listingId,
    }
    return await this.httpClient.request<T, E>(config)
  }

  async getFavorites<T = any[], E = unknown>(): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/user/favorites/all',
    }
    return await this.httpClient.request<T, E>(config)
  }
}
