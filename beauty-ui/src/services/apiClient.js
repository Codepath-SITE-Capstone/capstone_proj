import axios from "axios"

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.tokenName ="beauty_token"
    this.token = localStorage.getItem(this.tokenName)
  }

  setToken(token) {
    this.token = token
  }

  async request({ endpoint, method, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`
    console.debug("API Call:", endpoint, data, method)
    const params = method === `GET` ? data : {}
    const headers = {
      "Content-Type": "application/json",
    }
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    try {
      const res = await axios({ url, method, data, params, headers })
      return { data: res.data, error: null, message: null }
    } catch (error) {
      console.error("APIclient.makeRequest.error", error.response)
      const message = error?.response?.data?.error?.message
      return { data: null, error: message ?? String(error) }
    }
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` })
  }

  async signupUser(credentials) {
    return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
  }

  async updateUser(settings) {
    return await this.request({ endpoint: `settings`, method: `POST`, data: settings })
  }

  async loginUser(credentials) {
    return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
  }

  async createGiving(giving){
    return await this.request({ endpoint:`give`, method: `POST`, data: giving })
  }
  
  async fetchDonations(){
    return await this.request({ endpoint: `profile/donations`, method:`GET` })
  }

  async fetchRecycles(){
    return await this.request({ endpoint: `profile/recycles`, method:`GET` })
  }

  async fetchNumberDonationsRecycled(){
    return await this.request({ endpoint:`profile`, method:`GET` })
  }
  async addPic(pic) {
    return await this.request({ endpoint: `profile`, method: `POST`, data: pic })
  }
  async redeemPoints(){
    return await this.request({ endpoint: `points`, method: `POST`})
  }
  async viewPoints(){
    return await this.request({endpoint:`points`, method: `GET`})
  }
  
  async logoutUser() {
    console.log("user is logged out")
    this.setToken(null)
    localStorage.setItem(this.tokenName,"")
  }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")