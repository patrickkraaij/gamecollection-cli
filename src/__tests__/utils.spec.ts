import * as utils from '../utils'

describe('Given the api is called', () => {
  test('it should return the functions to get the information', async () => {
    // need to fake file
    const result = await utils.api();
    expect(typeof result.searchGame).toBe('function');
    expect(typeof result.getGameInformation).toBe('function');
    expect(typeof result.defaultApi).toBe('string');
  });
});

describe('Given the user wants to add Super Mario World', () => {
  test('Super Mario World should return Super Mario World', () => {
    const input = utils.multipleWordsInput(['node', 'index.js', 'add', 'Super', 'Mario', 'World']);
    expect(input).toBe('Super Mario World');
  });

  test('Super-Mario-World should return Super-Mario-World', () => {
    const input = utils.multipleWordsInput(['node', 'index.js', 'add', 'Super-Mario-World']);
    expect(input).toBe('Super-Mario-World');
  });

  test('Empty input should return empty string', () => {
    const input = utils.multipleWordsInput(['node', 'index.js', 'add']);
    expect(input).toBe('');
  });
});

describe('Given the log function is called', () => {
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleLogSpy = spyOn(console, 'log');
    consoleErrorSpy = spyOn(console, 'error');
  });

  describe('with type warning', () => {
    test('it should return the input with the dim style', () => {
      const input = 'Watch out!';
      utils.log('warning', input);
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe('with type success', () => {
    test('it should return the input with the sucess style', () => {
      const input = 'Good job!';
      utils.log('success', input);
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe('with type error', () => {
    test('it should return the input with the error style', () => {
      const input = 'Error!';
      utils.log('error', input);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('with type info', () => {
    test('it should return the input with the dim style', () => {
      const input = '100 games in my collection';
      utils.log('info', input);
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe('with an unknown type', () => {
    test('it should return the input with the dim style', () => {
      const input = 'This is so fancy';
      utils.log('fancy', input);
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });
});
