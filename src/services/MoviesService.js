import http from './http'

export function getMovies(params) {
  return http.get('/discover/movie', { params })
}

export function searchMovie(params) {
  return http.get('/search/movie', { params })
}
