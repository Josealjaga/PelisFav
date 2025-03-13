const { searchMovies } = require('../../services/api');

Component({
  data: {
    query: '', 
    suggestions: [],
  },
  methods: {
    
    onInput(e) {
      const query = e.detail.value;
      this.setData({ query });

     
      if (query.length > 2) {
        this.searchMovies(query);
      } else {
       
        this.setData({ suggestions: [] });
      }
    },

   
    async searchMovies(query) {
      try {
        const results = await searchMovies(query);
        this.setData({ suggestions: results });
      } catch (error) {
        console.error('Error al buscar películas:', error);
      }
    },

    
    onSuggestionTap(e) {
      const movieId = e.currentTarget.dataset.id;
      my.navigateTo({
        url: `/pages/Detail/Detail?id=${movieId}`,
      });
    },
  },
});