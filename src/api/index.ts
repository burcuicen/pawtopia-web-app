import { HttpClient } from './http-client'
import * as repositories from './repositories'

let __instance: PawtopiaAPI

export class PawtopiaAPI {
  private httpClient: HttpClient
  auth: repositories.AuthRepository
  listing: repositories.ListingRepository

  constructor() {
    this.httpClient = new HttpClient()
    this.auth = new repositories.AuthRepository(this.httpClient)
    this.listing = new repositories.ListingRepository(this.httpClient)
  }
  static getInstance() {
    return __instance || (__instance = new PawtopiaAPI())
  }
}
