import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_GLOBAL_WARMING_URL
})

export default instance

