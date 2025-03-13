/**
 * @module services/storage
 * @description Gestión del almacenamiento local para favoritos
 * @requires my.getStorageSync
 */
const STORAGE_KEY = "favorites";

/**
 * Obtiene la lista de favoritos
 * @function getFavorites
 * @returns {Array<Movie>} Lista de películas favoritas
 * @example
 * const favorites = getFavorites();
 * console.log('Favoritos:', favorites);
 */
function getFavorites() {
  const result = my.getStorageSync({ key: STORAGE_KEY }).data || [];
  console.log("Favoritos actuales:", result); 
  return result;
}

/**
 * Agrega una película a favoritos
 * @function addFavorite
 * @param {Movie} movie - Película a agregar
 * @throws {Error} Si la película ya existe en favoritos
 */
function addFavorite(movie) {
  let favorites = getFavorites();
  // Evita duplicados
  if (!favorites.some(fav => fav.id === movie.id)) {
    favorites.push(movie);
    my.setStorageSync({ key: STORAGE_KEY, data: favorites });
  }
}

/**
 * Elimina una película de favoritos
 * @function removeFavorite
 * @param {number} movieId - ID de la película a eliminar
 * @returns {boolean} True si se eliminó correctamente
 */
function removeFavorite(movieId) {
  let favorites = getFavorites().filter(fav => fav.id != movieId);
  my.setStorageSync({ key: STORAGE_KEY, data: favorites });
  return true;
}

module.exports = { getFavorites, addFavorite, removeFavorite };