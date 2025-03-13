const { getMovieDetails } = require('../../services/api');
const { getFavorites, addFavorite, removeFavorite } = require('../../services/storage');

Page({
  data: {
    movie: null,
    isFavorite: false,
    movieId: null
  },
  onLoad(options) {
    const movieId = options.id;
    this.setData({ movieId });
    this.loadMovieDetails(movieId);
    this.checkIfFavorite(movieId); 
  },
  onShow() {
    this.checkIfFavorite(this.data.movieId); 
  },
  async loadMovieDetails(movieId) {
    try {
      const movie = await getMovieDetails(movieId);
      this.setData({ movie });
    } catch (error) {
      console.error('Error al cargar detalles:', error);
    }
  },
  checkIfFavorite(movieId) {
    const favorites = getFavorites();
    const isFavorite = favorites.some(movie => movie.id == movieId);
    this.setData({ isFavorite });
  },
  toggleFavorite() {
    const { movieId, isFavorite } = this.data;
    if (!movieId) return;
    
    if (isFavorite) {
      removeFavorite(movieId);
    } else {
      if (this.data.movie) addFavorite(this.data.movie);
    }
    
    this.checkIfFavorite(movieId); 
  }
});