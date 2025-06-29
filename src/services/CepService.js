import axios from 'axios'

const http = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

export function getAddress(cep) {
  return http.get(`${cep}/json`)
}
