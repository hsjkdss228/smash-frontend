import testServer from './testServer';

beforeAll(() => {
  testServer.listen();
});

afterEach(() => {
  testServer.resetHandlers();
});

afterAll(() => {
  testServer.close();
});
