const { getFavorites } = require('../../services/storage');

Component({
  data: {
    favorites: []
  },
  methods: {
    loadFavorites() {
      this.setData({ favorites: getFavorites() });
    }
  },

  didMount() {
    this.loadFavorites();
  },

  pageEvents: {
    onShow() {
      this.loadFavorites();
    }
  }
});