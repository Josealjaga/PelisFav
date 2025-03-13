const { getTrendingMovies, searchMovies } = require('../services/api');

beforeAll(() => {
  global.my = {
    request: jest.fn()
  };
});

afterEach(() => {
  global.my.request.mockReset();
});

describe('API Service', () => {
  test('getTrendingMovies retorna lista de películas', async () => {
    const mockData = [{ id: 1, title: 'Movie 1' }];
    global.my.request.mockImplementation(({ success }) => success({ data: { results: mockData } }));

    const result = await getTrendingMovies();
    expect(result).toEqual(mockData);
    expect(global.my.request).toHaveBeenCalledWith({
      url: expect.stringContaining('/trending/movie/week'),
      method: 'GET',
      success: expect.any(Function),
      fail: expect.any(Function)
    });
  });

  test('searchMovies maneja errores correctamente', async () => {
    global.my.request.mockImplementation(({ fail }) => fail({ errorMessage: 'API Error' }));

    await expect(searchMovies('test')).rejects.toThrow('Search failed: API Error');
    expect(global.my.request).toHaveBeenCalledWith({
      url: expect.stringContaining('/search/movie'),
      method: 'GET',
      success: expect.any(Function),
      fail: expect.any(Function)
    });
  });
});