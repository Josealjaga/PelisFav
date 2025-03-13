Component({
  props: {
    movie: {}
  },
  methods: {
    onMovieTap() {
      const movieId = this.props.movie.id;
      my.navigateTo({
        url: `/pages/Detail/Detail?id=${movieId}`
      });
    }
  }
});