const { getFavorites, addFavorite, removeFavorite } = require('../services/storage');

global.my = {
  getStorageSync: jest.fn(),
  setStorageSync: jest.fn()
};

describe('Storage Service', () => {
  beforeEach(() => {
    global.my.getStorageSync.mockReset();
    global.my.setStorageSync.mockReset();
  });

  test('getFavorites retorna una lista vacía si no hay datos', () => {
    global.my.getStorageSync.mockReturnValue({ data: [] });

    const result = getFavorites();
    expect(result).toEqual([]);
    expect(global.my.getStorageSync).toHaveBeenCalledWith({ key: 'favorites' });
  });

  test('addFavorite agrega una película correctamente', () => {
    global.my.getStorageSync.mockReturnValue({ data: [] });

    const movie = { id: 1, title: 'Test Movie' };
    addFavorite(movie);

    expect(global.my.setStorageSync).toHaveBeenCalledWith({
      key: 'favorites',
      data: [movie]
    });
  });

  test('removeFavorite elimina una película correctamente', () => {
    global.my.getStorageSync.mockReturnValue({
      data: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }]
    });

    const result = removeFavorite(1);

    expect(result).toBe(true);
    expect(global.my.setStorageSync).toHaveBeenCalledWith({
      key: 'favorites',
      data: [{ id: 2, title: 'Movie 2' }]
    });
  });
});