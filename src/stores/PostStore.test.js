import context from 'jest-plugin-context';
import PostStore from './PostStore';

import server from '../testServer';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('PostStore', () => {
  const postStore = new PostStore();

  context('API 서버에 게시글을 요청할 경우', () => {
    it('게시글을 가져와 상태에 저장', async () => {
      await postStore.fetchPosts();

      expect(postStore.posts.length).toBe(2);
      expect(postStore.posts[0].detail).toContain('야구한판');
      expect(postStore.posts[0].participants[3].name).toBe('가르시아');
      expect(postStore.posts[1].detail).toContain('볼링 한겜 고고씽');
      expect(postStore.posts[1].participants[1].name).toBe('물트리버');
    });
  });
});
