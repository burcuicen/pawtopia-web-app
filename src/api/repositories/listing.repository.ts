import { HttpClient } from '../http-client'
import type { AxiosRequestConfig } from 'axios'
import type { RequestWrapper } from '../interfaces'

export class ListingRepository {
  private httpClient: HttpClient
  private URL = '/listing'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async getAll<T = any, E = unknown>(): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL
    }
    // Use publicRequest for public endpoint (no auth required)
    return await this.httpClient.publicRequest<T, E>(config)
  }

  async getById<T = any, E = unknown>(id: string): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.URL}/${id}`
    }
    return await this.httpClient.request<T, E>(config)
  }

  async create<T = any, E = unknown>(data: any): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.URL,
      data
    }
    return await this.httpClient.request<T, E>(config)
  }

  async update<T = any, E = unknown>(id: string, data: any): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${this.URL}/${id}`,
      data
    }
    return await this.httpClient.request<T, E>(config)
  }

  async delete<T = any, E = unknown>(id: string): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `${this.URL}/${id}`
    }
    return await this.httpClient.request<T, E>(config)
  }

  async approve<T = any, E = unknown>(id: string): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${this.URL}/${id}/approve`
    }
    return await this.httpClient.request<T, E>(config)
  }

  async getUsersListings<T = any, E = unknown>(): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.URL}/user`
    }
    return await this.httpClient.request<T, E>(config)
  }
}
