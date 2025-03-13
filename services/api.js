/**
 * @module services/api
 * @description Conexión con la API de The Movie Database (TMDb)
 * @requires my.request
 */
const API_KEY = "839a0073e9113a63cc5be1cf67c7af40";
const BASE_URL = "https://api.themoviedb.org/3";

function getTrendingMovies() {
  return new Promise((resolve, reject) => {
    my.request({
      url: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
      method: "GET",
      success: (res) => resolve(res.data.results),
      fail: (err) => reject(err),
    });
  });
}

/**
 * Obtiene películas en tendencia
 * @async
 * @function getTrendingMovies
 * @returns {Promise<Array<Movie>>} Lista de películas populares
 * @throws {Error} Si falla la solicitud a la API
 * @example
 * try {
 *   const movies = await getTrendingMovies();
 *   console.log('Películas populares:', movies);
 * } catch (error) {
 *   console.error('Error al obtener tendencias:', error);
 * }
 */
function searchMovies(query) {
  return new Promise((resolve, reject) => {
    my.request({
      url: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
      method: "GET",
      success: (res) => resolve(res.data.results),
      fail: (err) => reject(new Error(`Search failed: ${err.errorMessage}`)),
    });
  });
}

/**
 * Busca películas por término
 * @async
 * @function searchMovies
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array<Movie>>} Lista de películas coincidentes
 * @throws {Error} Si la búsqueda falla
 */
function getMovieDetails(movieId) {
  return new Promise((resolve, reject) => {
    my.request({
      url: `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-MX`, 
      method: "GET",
      success: (res) => resolve(res.data),
      fail: (err) => reject(err),
    });
  });
}

// Tipos TypeScript para mejor autocompletado
/**
 * @typedef {Object} Movie
 * @property {number} id - Identificador único
 * @property {string} title - Título de la película
 * @property {string} poster_path - Ruta del póster
 * @property {string} overview - Descripción
 * @property {number} vote_average - Puntuación promedio
 */
module.exports = { getTrendingMovies, searchMovies, getMovieDetails };
