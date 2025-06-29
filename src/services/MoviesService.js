import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDk3Yzk2NWNmNDg4NjIwNjQ2Y2U4ZDQ5YTNlMzU1NiIsIm5iZiI6MTc1MTEyMjkwMy4yNjEsInN1YiI6IjY4NjAwM2Q3MDlkYTdlZmQwOTgwNWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5n1Q1XCIps22Y7JRPUTcwEqdGICSYW4XnPxV51OldQ',
    accept: 'application/json',
  },
})

http.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params.language = 'pt-BR'
  return config
}, (error) => {
  return Promise.reject(error)
})


export function getMovies(params) {
  return http.get('/discover/movie', { params })
}

export function searchMovie(params) {
  return http.get('/search/movie', { params })
}
