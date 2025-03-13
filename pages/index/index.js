const {getTrendingMovies} = require("../../services/api");

Page({
  data: {
    movies: [],      
    trendingMovies: [], 
  },

  onLoad() {
    this.loadTrendingMovies();
  },

  loadTrendingMovies() {
    getTrendingMovies()
      .then((movies) => {
      this.setData({ movies, trendingMovies: movies });
    });
  },
  navigateToFavorites() {
    my.navigateTo({
      url: '/pages/Favorites/Favorites'
    });
  }
});
